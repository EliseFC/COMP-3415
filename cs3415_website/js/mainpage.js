//our variables for what is selected
	var rSelected, hSelected;
	
	var buildings, issues, hrs,user,building;
	
	updateIssues();
	updateHRs();
	
	$("#roomPanel").hide();
	
	//disable the "view" buttons before anything is selected
	$("#viewResreq").button({disabled: true});
	$("#viewHousereq").button({disabled: true});
	
	//select functions
	$("#resreqs").selectable({
		selected: function(event, ui) {
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
			rSelected = $(ui.selected).text();
			$("#viewResreq").button({disabled: false});
		}                   
	});
	$("#housereqs").selectable({
		selected: function(event, ui) { 
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
			hSelected = $(ui.selected).text();			
			$("#viewHousereq").button({disabled: false});
			getUserByID($('#housereqs .ui-selected').attr('id'),function(response){
				if(!response.success){
					console.log("**error fetching user**"+response.error_message);
				}else{
					console.log("**Sucessfully fetched user!**");
					//find the building for the request
					buildings.forEach(function(entry){
						if(entry.id==response.user.request_building){
							building = entry;
						}
					});
					
					$("#reqDetails").html(
					'<table style="width:100%">'+
					'<tr><th class="tableLeft">Student ID:</th><th>'+response.user.student_number+'</th></tr>'+
					'<tr><th class="tableLeft">First Name:</th><th>'+response.user.first_name+'</th></tr>'+
					'<tr><th class="tableLeft">Last Name:</th><th>'+response.user.last_name+'</th></tr>'+
					'<tr><th class="tableLeft">Year Level:</th><th>'+response.user.year+'</th></tr>'+
					'<tr><th class="tableLeft">Email:</th><th>'+response.user.email+'</th></tr>'+
					'<tr><th class="tableLeft">Building Requested:</th><th>'+building.name+'</th></tr>'+
					'<tr><th class="tableLeft">Type:</th><th>'+building.type+'</th></tr>'+
					'<tr><th class="tableLeft">Notes:</th><th>'+hrs[$('#housereqs .ui-selected').index()].request+'</th></tr>'+
					'</table>'
					);
				}
			});
			
		}                   
	});
	
	//change panel to list of available rooms
	$("#approve").click(function(event){
		$("#reqDetails").html("");
		$("#roomPanel").show();
		updateRooms();
	});
	
	
	$("#dialog-resreq" ).dialog({
		autoOpen: false,
		resizable: true,
		height: "auto",
		width: 600,
		modal: true,
		buttons: {
			"Comfirm": function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		hide: 'fold',
        show: 'fold'
	});
	
	//view resident request
	$("#viewResreq").click(function(event){
		$("#dialog-resreq").dialog("open");
		
		//GET ACTUAL REQUEST DETAILS
		$("#DetailsText").html("Selected: " +rSelected);
	});
	
	
	//testing view housing request
	$("#viewHousereq").click(function(event){
		$("#dialog-housereq").dialog("open");
		//GET ACTUAL DETAILS...
		$("#HouseDetailsText").html("Selected: " +hSelected);
	});
	
	function updateIssues(){
		//get the issues, first get the buildings, to get the issues
		getBuildings(function(response){
			if(!response.success){
				console.log("error getting buildings"+response.error_message);
			}else{
				buildings = response.buildings;
				buildings.forEach(function(entry){
					getIssues(entry.id,function(response){
						if(!response.success){
							console.log("error getting issues"+response.error_message);
						}else{
							issues = response.issues;
							if(issues.length > 0){
								issues.forEach(function(entry2){
								$("#resreqs").append('<li class="style=ui-widget-content" id="'+issues.issue+'">'+'Building: '+entry.name+ ' ' +issues.issue+'</li>');
								});	
							}
						}
					});
				});
			}
			console.log("**Sucessfully fetched buildings!**");
		});
	}
	
	$("#testReq").click(function(event){
		addHousingRequest(18,"2 ply extra strong toilet paper",buildings[0].id,function(response){
			if(!response.success){
				console.log("**Error setting requests!***"+response.error_message);
			}else{
				console.log("**set requests***");
			}
		});
	});
	
	function updateHRs(){
		$("#housereqs").empty();
		getHousingRequests(function(response){
			if(!response.success){
				console.log("**Error getting housing requests!***"+response.error_message);
			}else{
				console.log("**Got housing requests***");
				hrs = response.requests;
				
				hrs.forEach(function(entry){
					$("#housereqs").append('<li class="style=ui-widget-content" id="'+entry.student_id+'">'+'ID: '+entry.student_id+ ' Building: ' +entry.building_id+'</li>');
				});
			}
		});
	}
	
	//stuff for the rooms
	function updateRooms(){
	getRooms(hrs[$('#housereqs .ui-selected').index()].building_id,function(response){
		$("#rooms").empty();
		if(!response.success){
			console.log("error fetching rooms"+response.error_message);
		}else{
			rooms = response.rooms;
			rooms.forEach(function(entry){
				//get the occupants from the current room and check against room capacity
				getOccupants(entry.id, function(response){
					var count=0;
					
					if(!response.success){
						console.log("**error getting occupants***"+error_message)
					}else{
						console.log("***got occupants***");
						response.occupants.forEach(function(entry2){
							count++;
						});
					}
					//append the room if there's available capacity space
					if(count<entry.capacity){
						$("#rooms").append('<li class="style=ui-widget-content" id="'+entry.id+'">Room Number: '+entry.number+' Available: '+(entry.capacity-count)+'</li>');	
					}
				});
			});
			console.log("**Sucessfully fetched rooms!**");
		}
	});
	}
	
	$("#rooms").selectable({
		selected: function(event, ui) { 
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
			//rSelected = $(ui.selected).text();
		}                   
	});
	
	//confirm and cancel room choice
	$("#confirmRoom").click(function(event){
		approveRequest($('#housereqs .ui-selected').attr('id'),$('#rooms .ui-selected').attr('id'),function(response){
			if(!response.success){
				console.log("***Error confirming room thing***"+response.error_message);
			}else{
				console.log("***confirmed!***");
				$("#roomPanel").hide();
				updateHRs();
			}
		});
	});
	
	$("#cancelRoom").click(function(event){
		$("#roomPanel").hide();
		updateHRs();
	});
	
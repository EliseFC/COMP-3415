//our variables for what is selected
	var rSelected, hSelected;
	
	var buildings, hrs,user,building;
	
	var users;
	
	var issues = [];
	
	updateIssues();
	updateHRs();
	
	//get the users and stuff them into 'users'
	
	getUsers(function(response){
		if(!response.success){
			console.log("**Error retrieving users**"+response.error_message);
		}else{
			console.log("**Successfully retrieved users**");
			users = response.users;
		}
	});
	
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
		$("#reqDetails").html(
					'<table style="width:100%">'+
					'<tr><th class="tableLeft">Student ID:</th><th></th></tr>'+
					'<tr><th class="tableLeft">First Name:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Last Name:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Year Level:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Email:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Building Requested:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Type:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Notes:</th><th></th></tr>'+
					'</table>');
		$("#reqPanel").hide();
		$("#roomPanel").show();
		updateRooms();
	});
	
	$("#deny").click(function(event){
		denyRequest(hrs[$('#housereqs .ui-selected').index()].student_id,function(response){
			if(!response.success){
				console.log("**error denying request***"+response.error_message);
			}else{
				console.log("**denied!!!***");
				$("#reqDetails").html(
					'<table style="width:100%">'+
					'<tr><th class="tableLeft">Student ID:</th><th></th></tr>'+
					'<tr><th class="tableLeft">First Name:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Last Name:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Year Level:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Email:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Building Requested:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Type:</th><th></th></tr>'+
					'<tr><th class="tableLeft">Notes:</th><th></th></tr>'+
					'</table>');
				updateHRs();
			}
		});
	});
	
	
	$("#dialog-resreq" ).dialog({
		autoOpen: false,
		resizable: true,
		height: "auto",
		width: 600,
		modal: true,
		buttons: {
			"Set In Progress": function() {
				setIssueStatus($('#resreqs .ui-selected').attr('id'),"In Progress",function(response){
					if(!response.success){
						console.log("**ERROR**"+response.error_message);
					}else{
						console.log("**Set issue status**");
					}
				});
				$( this ).dialog( "close");
				updateIssues();
			},
			"Remove": function() {
				removeIssue($('#resreqs .ui-selected').attr('id'),function(response){
					if(!response.success){
						console.log("**ERROR**"+response.error_message);
					}else{
						console.log("**Removed issue**");
					}
				});
				updateIssues();
				$( this ).dialog("close");
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
		console.log("USINGID:"+$('#resreqs .ui-selected').attr('uid'));
		console.log(issues[0]);
		$("#DetailsText").html(
			"Student ID: " + issues[$('#resreqs .ui-selected').index()].student_id + '<br>'+
			"Name: " + issues[$('#resreqs .ui-selected').index()].fname + " " + issues[$('#resreqs .ui-selected').index()].lname +"<br>"+
			"Building: " + issues[$('#resreqs .ui-selected').index()].building + "<br>"+
			"Issue Details: "+issues[$('#resreqs .ui-selected').index()].text+"<br>"+
			"Status: "+issues[$('#resreqs .ui-selected').index()].status+"<br>"
		);
		$("#dialog-resreq").dialog("open");
	});
	
	
	//testing view housing request
	$("#viewHousereq").click(function(event){
		$("#dialog-housereq").dialog("open");
		//GET ACTUAL DETAILS...
		$("#HouseDetailsText").html("Selected: " +hSelected);
	});
	
	function updateIssues(){
		$("#resreqs").empty();
		issues = [];//empty issues
		//get the issues, first get the buildings, to get the issues
		//fade in and fade out for big delay!
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
								if(response.issues.length > 0){
									
									response.issues.forEach(function(entry2){
										getUserByID(entry2.student_id,function(response){
											if(!response.success){
												console.log(response.error_message);
											}else{
												console.log(response.user.student_number);
												//make a newissue object and push it into issues
												newIssue = {
													id: entry2.issue_id,
													building: entry.name,
													text: entry2.issue,
													student_id: response.user.student_number,
													fname: response.user.first_name,
													lname: response.user.last_name,
													status: entry2.status
												}
												issues.push(newIssue);
												$("#resreqs").append('<li class="style=ui-widget-content" uid="'+entry2.student_id+'"id="'+entry2.issue_id+'">'+'Building: '+entry.name+' Name: '+response.user.last_name+'('+entry2.status+')'+'</li>');
											}
										});
										
									});	
								}
							}
						});
					});
				}
				console.log("**Sucessfully fetched buildings!**");
			});
	}
	//TEST FUNCTIONS DELETE LATERRRRR
	$("#testResreq").click(function(event){
		addIssue(18,buildings[0].id,"I HAVE AN ISSUE PLS HALP",function(response){
			if(!response.success){
				console.log("**Error setting issue!***"+response.error_message);
			}else{
				console.log("**set issue***");
			}
		});
	});
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
					getUserByID(entry.student_id,function(response){
						if(!response.success){
							console.log("**ERROR**"+response.error_message);
						}else{
							console.log("*Got user id*"+entry.student_id);
							buildings.forEach(function(entry2){
								if(entry2.id==entry.building_id){
									$("#housereqs").append('<li class="style=ui-widget-content" id="'+entry.student_id+'">'+'Name: '+response.user.last_name+' ID: '+response.user.student_number+ ' Building: ' +entry2.name+'</li>');
								}
							});
						}
						
					});
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
				$("#reqPanel").show();
				updateHRs();
			}
		});
	});
	
	$("#cancelRoom").click(function(event){
		$("#roomPanel").hide();
		$("#reqPanel").show();
		updateHRs();
	});
	
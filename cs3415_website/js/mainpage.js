//our variables for what is selected
	var rSelected, hSelected;
	
	var buildings, issues, hrs;
	
	updateIssues();
	updateHRs();
	
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
		}                   
	});
	
	//Dialog to display the details of selected resident request
	$("#dialog-resreq" ).dialog({
		autoOpen: false,
		resizable: true,
		height: "auto",
		width: 600,
		modal: true,
		buttons: {
			"Complete/Remove": function() {
				//DELETE ENTRY IN DATABASE
				$("#viewResreq").button({disabled: true});
				$( this ).dialog( "close" );
			},
			"Close": function() {
				$( this ).dialog( "close" );
			}
		},
		hide: 'fold',
        show: 'fold'
	});
	
	$("#dialog-housereq" ).dialog({
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
	
	function updateHRs(){
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
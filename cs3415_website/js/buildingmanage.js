//our variables for what is selected
var bSelected, rSelected, fSelected;

var buildings, rooms, occupants, notifs;
var facilities = [];

var bIndex;
//disable the buttons before anything is selected
$("#remBldg").button({disabled: true});
$("#viewRoom").button({disabled: true});
$("#addRoom").button({disabled: true});
$("#remRoom").button({disabled: true});

//hide view rooms button
$("#switchRoom").hide();

//building list generation
function updateBuildings(){
	facilities = [];
	$("#buildings").empty();
	
	getBuildings(function(response){
		if(!response.success){
			console.log("error getting buildings"+response.error_message);
		}else{
			buildings = response.buildings;
			buildings.forEach(function(entry){
				$("#buildings").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.name+': '+entry.type+'</li>');
				//populate our facilities array
				console.log(entry.facilities);
				facilities.push(entry.facilities);
			});
			console.log("**Sucessfully fetched buildings!**");
		}
	});
}

updateBuildings();

function updateRooms(){
	getRooms($('#buildings .ui-selected').attr('id'),function(response){
		$("#rooms").empty();
		if(!response.success){
			console.log("error fetching rooms"+response.error_message);
		}else{
			rooms = response.rooms;
			rooms.forEach(function(entry){
				$("#rooms").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.number+'</li>');
			});
			console.log("**Sucessfully fetched rooms!**");
		}
	});
}

//update statement list
function updateStatements(){
	$("#statementlist").empty();
	getNotifications($('#buildings .ui-selected').attr('id'),function(response){
		if(!response.success){
			console.log("**error fetching notifications**"+response.error_message);
		}else{
			notifs = response.notifications;
			notifs.forEach(function(entry){
				$("#statementlist").append('<li class="style=ui-widget-content" id="'+entry.notification_id+'">'+entry.notification+'</li>');
			});
			console.log("**Sucessfully fetched notifications****");
		}
	});
}

//select functions
$("#buildings").selectable({
	selected: function(event, ui) {
		//set the building selected index variable
		
		//disable buttons that require room/facility selection
		$("#remRoom").button({disabled: true});
		$("#viewRoom").button({disabled: true});
		$("#remBldg").button({disabled: false});
		$("#addRoom").button({disabled: false});
		
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");
		
		//set the building selected index variable
		bIndex = $(ui.selected).index();
		
		bSelected = $(ui.selected).text();
		//change the statement issue text
		$("#sbName").html("New Statement for "+bSelected);
		//update room title
		$("#roomTitle").fadeOut('fast',function(){
			$("#roomTitle").html("Rooms in " + bSelected);
			$("#roomTitle").fadeIn('fast');
		});
		//generate room list (will be api query later)
		$("#rooms").slideUp('fast',function(){
			$("#rooms").empty();
			updateRooms();
			$("#rooms").slideDown('fast');
		});
		//generate facilities string
		$("#facDisplay").html("Facilities: "+facilities[bIndex]);
		
		updateStatements();
	}
});
$("#rooms").selectable({
	selected: function(event, ui) { 
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
		rSelected = $(ui.selected).text();			
		$("#viewRoom").button({disabled: false});
		$("#remRoom").button({disabled: false});
	}                   
});
$("#statementlist").selectable({
	selected: function(event, ui) {
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");
	}
});

$("#oList").selectable({
	selected: function(event, ui) {
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");
	}
});


//Add building button
$("#newBldg").click(function(event){
	$("#dialog-addBldg").dialog("open");
});

//Dialog to add building
$("#dialog-addBldg" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			//function(name, type, facilities, callback
			addBuilding($("#buildingName").val(),$("#buildingType").val(),$("#buildingFacilities").val(),function(response){
				if(!response.success){
					console.log("***ERROR adding building***" +response.error_message);
				}else{
					console.log("**Sucessfully saved new building!**");
					$("#dialog-addBldg").dialog("close");
			
				$("#buildings").fadeOut(function(){
					updateBuildings();
				});
				$("#buildings").fadeIn();
				}
			});
			
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//Remove building button
$("#remBldg").click(function(event){
	$("#remBldgDetails").html("Removing: " + bSelected);
	$("#dialog-remBldg").dialog("open");
});

//Dialog to remove building
$("#dialog-remBldg" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			removeBuilding($('#buildings .ui-selected').attr('id'),function(response){
				if(!response.success){
					console.log("error removing building"+response.error_message);
					alert("whoops!");
				}else{
					console.log("**Sucessfully removed!**");
				}
			});
			$("#buildings").fadeOut(function(){
				updateBuildings();
				clearRooms();
			});
			$("#buildings").fadeIn();
			
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//view facilites button
$("#editFac").click(function(event){
	$("#editFacText").val(facilities[bIndex]);
	$("#dialog-editFac").dialog("open");
});
//view rooms button
$("#switchRoom").click(function(event){
	$("#switchRoom").hide();
	$("#viewFac").show();
	$("#facPanel").fadeOut('fast',function(){
		$("#roomPanel").fadeIn('fast');
	});
});

//dialog view room
$("#dialog-viewRoom" ).dialog({
	autoOpen: false,
	resizable: true,
	height: 760,
	width: 600,
	modal: true,
	buttons: {
		"OK": function() {
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});
//dialog edit room equipment
$("#dialog-editEquip" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			
			updateDevices($("#rooms .ui-selected").attr('id'),$("#inputEquip").val(),function(response){
				
				if(!response.success){
					console.log("***error updating devices***"+response.error_message);
				}else{
					$("#vDev").html($("#inputEquip").val());
					console.log("**Sucessfully updated devices**");
					updateRooms();
				}
				
			});
			$( this ).dialog( "close" );
			
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//edit equipment button
$("#editEquip").click(function(event){
	$("#inputEquip").val(rooms[$("#rooms .ui-selected").index()].devices);
	$("#dialog-editEquip").dialog("open");
});


//view room button
$("#viewRoom").click(function(event){
	getOccupants($('#rooms .ui-selected').attr('id'),function(response){
		if(!response.success){
			console.log("***error getting occupants***"+response.error_message);
		}else{
			//occupants= response.occupants;
			console.log("**Sucessfully got occupants!**");
			$("#roomDetails").html(
			'Building: ' + bSelected +
			'<br>Room Number: ' + rSelected +
			'<br>Devices:<div id="vDev">' + rooms[$('#rooms .ui-selected').index()].devices + '</div>' +
			'<br>Capacity: ' + rooms[$('#rooms .ui-selected').index()].capacity +
			'<br>Occupant(s): '+
			'<div style="height:65%;width:100%;overflow-y:scroll">'+
			'<ul class="selectlistsm" id="oList">'+
			'</ul>'+
			'</div>'
			);

			
			if(response.occupants[0]){
				response.occupants.forEach(function(entry){
					$("#oList").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.student+'<br>'+entry.start_date+'->'+entry.end_date+
					'<button id="'+entry.student_id+'" class="remOcBtn ui-button ui-widget ui-corner-all">Remove</button></li>');
					//remove occupant function for each button
					$("#"+entry.student_id+".remOcBtn").click(function(event){
						console.log("am i working????");
						removeOccupant(entry.student_id,function(response){
							if(!response.success){
								console.log("***error removing occupant**"+response.error_message);
							}else{
								console.log("***removed occupant***");
								$("#viewRoom").trigger("click");
							}
						});
					});
				});
			}else{
				$("#oList").append('<li class="style=ui-widget-content">Unoccupied</li>');
			}
			
			
			$("#dialog-viewRoom").dialog("open");
		}
	});
	
});

//dialog addrooom
$("#dialog-addRoom" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			//function(roomNo, buildingID, devices, callback)
			addRoom($("#newRoomName").val(),$('#buildings .ui-selected').attr('id'),$("#newRoomDevices").val(),$("#newRoomCap").val(),function(response){
				if(!response.success){
					console.log("***error adding room***"+response.error_message);
					alert("whoops!");
				}else{
					console.log("**Sucessfully saved new room!**");
				}
			});
			updateRooms();
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//add room button
$("#addRoom").click(function(event){
	$("#addRoomDetails").html("Adding room to " + bSelected);
	//clear the fields
	$("#newRoomName").val("");
	$("#newRoomDevices").val("");
	$("#newRoomCap").val("");
	//open the dialog
	$("#dialog-addRoom").dialog("open");
});

//dialog remove room
$("#dialog-remRoom" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			removeRoom($('#rooms .ui-selected').attr('id'),function(response){
				if(!response.success){
					console.log("**ERROR removing room**");
				}else{
					console.log("**Sucessfully removed!**");
				}
				updateRooms();
			});
			updateRooms();
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//remove room button
$("#remRoom").click(function(event){
	$("#remRoomDetails").html("Removing: " + rSelected);
	$("#dialog-remRoom").dialog("open");
});

//dialog addfac
$("#dialog-editFac" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			updateFacilities($('#buildings .ui-selected').attr('id'),$("#editFacText").val(),function(response){
				if(!response.success){
					console.log(+"**ERROR editing facilities**" + response.error_message);
				}else{
					console.log("**Sucessfully updated facilites!**");
				}
			});
			$("#facDisplay").html('Select a building');
			$("#rooms").empty();
			$("#statementlist").empty();
			updateBuildings();
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});
//button for issueing statement
$("#isBtn").click(function(event){
	$("#dialog-issueSatement").dialog("open");
});
//dialog for issueing statement
$("#dialog-issueSatement" ).dialog({
	autoOpen: false,
	resizable: true,
	height: "auto",
	width: 600,
	modal: true,
	buttons: {
		"OK": function() {
			addNotification($('#buildings .ui-selected').attr('id'),$("#statementText").val(),function(response){
				if(!response.success){
					console.log("**ERROR posting notification**" + response.error_message);
				}else{
					console.log("**Sucessfully posted notification**!**");
					updateStatements();
				}
			});
			$( this ).dialog( "close" );
			$("#statementText").val("");
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});
//remove fac button
$("#remFac").click(function(event){
	$("#remFacDetails").html("Removing: " + fSelected);
	$("#dialog-remFac").dialog("open");
});
//function to clear room panel
function clearRooms(){
	//clear the contents
	$("#facDisplay").html("");
	$("#roomTitle").html("Select a building");
	$("#rooms").empty();
	
	//disable the buttons
	$("#viewRoom").button({disabled: true});
	$("#addRoom").button({disabled: true});
	$("#remRoom").button({disabled: true});
}

$("#rmSt").click(function(event){
	if(!$('#statementlist .ui-selected').attr('id')){
		alert("Please select a notification");
	}else{
		removeNotification($('#statementlist .ui-selected').attr('id'),function(response){
		if(!response.success){
				console.log("**ERROR removing notification**" + response.error_message);
			}else{
				console.log("**Sucessfully removed notification**!**");
				updateStatements();
			}
		});
	}
});
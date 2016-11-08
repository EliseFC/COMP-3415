//our variables for what is selected
var bSelected, rSelected, fSelected;
//hide the facilities panel for now
$("#facPanel").hide();
//disable the buttons before anything is selected
$("#remBldg").button({disabled: true});
$("#viewRoom").button({disabled: true});
$("#addRoom").button({disabled: true});
$("#remRoom").button({disabled: true});
$("#addFac").button({disabled: true});
$("#remFac").button({disabled: true});

//hide view rooms button
$("#switchRoom").hide();

//building list generation
function updateBuildings(){
	$("#buildings").empty();
	for(i=0;i<5;i++){
	$("#buildings").append('<li class="style=ui-widget-content" id="buildingID' + i + '"> Something '+i+'</li>');
	}
}

updateBuildings();

//select functions
$("#buildings").selectable({
	selected: function(event, ui) {
		//disable buttons that require room/facility selection
		$("#remRoom").button({disabled: true});
		$("#remFac").button({disabled: true});
		$("#viewRoom").button({disabled: true});
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
		bSelected = $(ui.selected).text();
		$("#remBldg").button({disabled: false});
		$("#addRoom").button({disabled: false});
		$("#addFac").button({disabled: false});
		//update room title
		$("#roomTitle").fadeOut('fast',function(){
			$("#roomTitle").html("Rooms in " + bSelected);
			$("#roomTitle").fadeIn('fast');
		});
		//generate room list (will be api query later)
		$("#rooms").slideUp('fast',function(){
			$("#rooms").empty();
			for(i=0;i<5;i++){
				$("#rooms").append('<li class="style=ui-widget-content" id="roomID' + i + '">'+bSelected+' Something '+i+'</li>');
			}
			$("#rooms").slideDown('fast');
		});
		//generate facilities list (query query blahblah)
		$("#facilitesList").empty();
		for(i=0;i<5;i++){
			$("#facilitesList").append('<li class="style=ui-widget-content" id="facID"' + i + '">'+bSelected+' Something '+i+'</li>');
		}
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
			$( this ).dialog( "close" );
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
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//facilities selectable list
$("#facilitesList").selectable({
	selected: function(event, ui) { 
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
		fSelected = $(ui.selected).text();			
		$("#remFac").button({disabled: false});
	}                   
});

//view facilites button
$("#viewFac").click(function(event){
	$("#viewFac").hide();
	$("#switchRoom").show();
	$("#roomPanel").fadeOut('fast',function(){
		$("#facPanel").fadeIn('fast');
	});
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
	resizable: false,
	height: "auto",
	width: 300,
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

//view room button
$("#viewRoom").click(function(event){
	$("#roomDetails").html("Viewing Details: " + rSelected);
	$("#dialog-viewRoom").dialog("open");
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
$("#dialog-addFac" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
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

//add facility button
$("#addFac").click(function(event){
	$("#addFacDetails").html("Adding facility to " + bSelected);
	$("#dialog-addFac").dialog("open");
});

//dialog remove fac
$("#dialog-remFac" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
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

//remove fac button
$("#remFac").click(function(event){
	$("#remFacDetails").html("Removing: " + fSelected);
	$("#dialog-remFac").dialog("open");
});
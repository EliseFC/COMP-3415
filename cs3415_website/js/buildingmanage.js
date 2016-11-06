//our variables for what is selected
var bSelected, rSelected;

//disable the buttons before anything is selected
$("#remBldg").button({disabled: true});
$("#viewRoom").button({disabled: true});
$("#addRoom").button({disabled: true});
$("#remRoom").button({disabled: true});

//select functions
$("#buildings").selectable({
	selected: function(event, ui) {
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
		bSelected = $(ui.selected).text();
		$("#remBldg").button({disabled: false});
		$("#addRoom").button({disabled: false});
		
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

//Dialog to add building
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
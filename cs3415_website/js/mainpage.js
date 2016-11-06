//our variables for what is selected
	var rSelected, hSelected;
	
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
			sSelected = $(ui.selected).text();			
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
	
	//view resident request
	$("#viewResreq").click(function(event){
		$("#dialog-resreq").dialog("open");
		
		//GET ACTUAL REQUEST DETAILS
		$("#DetailsText").html("Selected: " +rSelected);
	});
	
	
	//testing view housing request
	$("#viewHousereq").click(function(event){
		alert("Selected: " + sSelected);
	});
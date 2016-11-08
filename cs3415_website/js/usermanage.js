//our variables for what is selected
	var uSelected;
	
	//disable the edit details and remove buttons before anything is selected
	$("#editDetails").button({disabled: true});
	$("#remUser").button({disabled: true});
	
	//select functions
	$("#userlist").selectable({
		selected: function(event, ui) {
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
			uSelected = $(ui.selected).text();
			$("#editDetails").button({disabled: false});
			$("#remUser").button({disabled: false});
			//update user details form
			$("#userDetails").html('Selected: '+uSelected);
		}                   
	});
	
	//make some junk for the users for now
	//THIS WILL COME FROM DATABSE AFTER
	function updateUsers(){
		$("#userlist").empty();
		for(i=0;i<5;i++){
			$("#userlist").append('<li class="style=ui-widget-content" id="userID' + i + '"> Something '+i+'</li>');
		}
	}
	
	//update the users(we will call this whenever we change anything)
	updateUsers();
	
	
	//Dialog to manually create user (e.g. manager)
	$("#dialog-createuser" ).dialog({
		autoOpen: false,
		resizable: true,
		height: "auto",
		width: 600,
		modal: true,
		buttons: {
			"OK": function() {
				//Update user details pane, database entry,etc.
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		hide: 'fold',
        show: 'fold'
	});
	//Dialog to edit the selected user details
	$("#dialog-edituser" ).dialog({
		autoOpen: false,
		resizable: true,
		height: "auto",
		width: 600,
		modal: true,
		buttons: {
			"OK": function() {
				//Update user details pane, database entry,etc.
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		hide: 'fold',
        show: 'fold'
	});
	
	$("#dialog-remuser" ).dialog({
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
	$("#newUser").click(function(event){
		$("#dialog-createuser").dialog("open");
		
		//balh?
	});
	
	
	//edit selected user details
	$("#editDetails").click(function(event){
		$("#dialog-edituser").dialog("open");
		//populate form with user details
	});
	
	//remove selected user
	$("#remUser").click(function(event){
		$("#dialog-remuser").dialog("open");
		$("#remUserContents").html('Removing: ' + uSelected);
	});
	
	$("#userSearch").keypress(function(e) {
    if(e.which == 13) {
        alert('Search using: ' + $(this).val());
		$(this).val('');
    }
	});
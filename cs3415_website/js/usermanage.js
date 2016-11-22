//our variables for what is selected
	var uSelected;
	var users;
	
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
	
	//function to update the user list
	function updateUsers(){
		$("#userlist").empty();
		getUsers(function(response){
			if(!response.success){
				console.log("**Error retrieving users**"+response.error_message);
			}else{
				console.log("**Successfully retrieved users**");
				users = response.users;
				users.forEach(function(entry){
				$("#userlist").append('<li class="style=ui-widget-content" id="'+entry.user_id+'">ID: '+entry.student_number+': '+entry.last_name+'</li>');
			});
			}
		});
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
				//function(first_name, last_name, student_number, year, email, password, callback) {
				addUser($("#fnText").val(),$("#lnText").val(),$("#snText").val(),$("#ylText").val(),$("#emText").val(),$("#pwText").val(),function(response){
					if(!response.success){
						console.log("**Error adding new user!**"+response.error_message);
					}else{
						console.log("**Added new user!**");
						updateUsers();
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
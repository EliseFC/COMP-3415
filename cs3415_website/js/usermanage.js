//our variables for what is selected
	var uIndex;
	var users;
	
	//disable the edit details and remove buttons before anything is selected
	function clearDetails(){
		$("#editDetails").button({disabled: true});
		$("#remUser").button({disabled: true});
		$("#mmBtn").button({disabled: true});
		$("#userDetails").html("Please select a user.");
	}
	
	clearDetails();
	
	//select functions
	$("#userlist").selectable({
		selected: function(event, ui) {
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
			uIndex = $(ui.selected).index();
			//activate inactive buttons
			$("#editDetails").button({disabled: false});
			$("#remUser").button({disabled: false});
			$("#mmBtn").button({disabled: true});
			//update user details form
			updateUserDetails();
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
	function updateUserDetails(){
		getUserByID($('#userlist .ui-selected').attr('id'),function(response){
			if(!response.success){
				console.log("**Error retrieving user info**"+response.error_message);
			}else{
				console.log("**Successfully retrieved user info**");
				//Generate user info page
				$("#userDetails").html(
				'<table style="width:100%">'+
				'<tr><th class="tableLeft">Student ID:</th><th>'+response.user.student_number+'</th></tr>'+
				'<tr><th class="tableLeft">First Name:</th><th>'+response.user.first_name+'</th></tr>'+
				'<tr><th class="tableLeft">Last Name:</th><th>'+response.user.last_name+'</th></tr>'+
				'<tr><th class="tableLeft">Year Level:</th><th>'+response.user.year+'</th></tr>'+
				'<tr><th class="tableLeft">Email:</th><th>'+response.user.email+'</th></tr>'+
				'<tr><th class="tableLeft">Account Type:</th><th>'+response.user.account_type+'</th></tr>'+
				'<tr><th class="tableLeft">House Request:</th><th>'+response.user.request_building+'</th></tr>'+
				'</table>'
			);
			}
			
		});
	}
	
	//update the users(we will call this whenever we change anything)
	updateUsers();
	
	
	//Dialog to manually create user (e.g. manager)
	$("#dialog-createuser" ).dialog({
		autoOpen: false,
		resizable: false,
		height: "auto",
		width: 455,
		modal: true,
		buttons: {
			"OK": function() {
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
				removeUser($('#userlist .ui-selected').attr('id'),function(response){
					if(!response.success){
						console.log("**Error removing user!**"+response.error_message);
					}else{
						console.log("**Removed user!**");
						updateUsers();
						clearDetails();
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
	
	//view resident request
	$("#newUser").click(function(event){
		$("#dialog-createuser").dialog("open");
		$(".newUserForm").val("");
	});
	
	
	//grand manager privilages
	$("#mmBtn").click(function(event){
		promoteUserToManager($('#userlist .ui-selected').attr('id'),function(response){
			if(!response.success){
					console.log("**Error promoting user!**"+response.error_message);
				}else{
					console.log("**Promoted user!**");
					updateUsers();
					updateUserDetails();
				}
		});
	});
	
	//remove selected user
	$("#remUser").click(function(event){
		$("#dialog-remuser").dialog("open");
		$("#remUserText").html('Removing: ' + users[uIndex].email + '<br>Are you sure?');
	});

	//search for a user by stringing together student id, first name, and last name....
	$("#userSearch").keypress(function(e) {
		if(e.which == 13) {
			if($(this).val()==""){
				//if blank just get all the users
				updateUsers();
			}else{
				//don't bother updating the users for searching
				$("#userlist").empty();
				users.forEach(function(entry){
					if((entry.student_number+entry.first_name+entry.last_name).indexOf($("#userSearch").val())>=0){
						$("#userlist").append('<li class="style=ui-widget-content" id="'+entry.user_id+'">ID: '+entry.student_number+': '+entry.last_name+'</li>');
					}
				});
			}
			clearDetails();
		}
	});
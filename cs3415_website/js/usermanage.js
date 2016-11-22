//our variables for what is selected
	var uIndex;
	var users;
	
	//disable the edit details and remove buttons before anything is selected
	$("#editDetails").button({disabled: true});
	$("#remUser").button({disabled: true});
	
	//select functions
	$("#userlist").selectable({
		selected: function(event, ui) {
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
			uIndex = $(ui.selected).index();
			$("#editDetails").button({disabled: false});
			$("#remUser").button({disabled: false});
			//update user details form
			getUserByID(users[uIndex].user_id,function(response){
				if(!response.success){
					console.log("**Error retrieving user info**"+response.error_message);
				}else{
					console.log("**Successfully retrieved user info**");
					//Generate user info page
					$("#userDetails").html(
					'Student ID:'+response.user.student_number+'<br>'+
					'First Name:'+response.user.first_name+'<br>'+
					'Last Name:'+response.user.last_name+'<br>'+
					'Year Level:'+response.user.year+'<br>'+
					'Account Type:'+response.user.email+'<br>'+
					'Student ID:'+users[uIndex].student_number+'<br>'+
				);
				});
				
			});
			
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
		$("#remUserText").html('Removing: ' + uSelected + '<br>Are you sure?');
	});
	
	$("#userSearch").keypress(function(e) {
    if(e.which == 13) {
        alert('Search using: ' + $(this).val());
		$(this).val('');
    }
	});
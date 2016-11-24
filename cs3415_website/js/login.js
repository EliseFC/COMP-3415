$(document).ready(function(){
	$("#mlogin").click(function(){
		var creds = {
			username: $("#username").val(),
			password: $("#password").val(),
			time: $.now()
		}
		sessionStorage.setItem("managerSession",JSON.stringify(creds));
		getUserByEmail(creds.username,function(response){
			if(!response.success){
				console.log("**Didn't get the user info**"+response.error_message);
				alert("Invalid username or password!");
			}else{
				console.log("**got the user info**");
				if(response.user.password!=$("#password").val()||response.user.email!=$("#username").val()){
					alert("Invalid username or password!");
				}else{
					if(response.user.account_type!="manager"){
						alert("You do not have manager privileges.");
					}else{
						window.location.href = 'mhome.html';
					}
					
				}
			}
		});
	});
	$("#slogin").click(function(){
		var creds = {
			username: $("#username").val(),
			password: $("#password").val(),
			time: $.now()
		}
		sessionStorage.setItem("studentSession",JSON.stringify(creds));
		getUserByEmail(creds.username,function(response){
			if(!response.success){
				console.log("**Didn't get the user info**"+response.error_message);
				alert("Invalid username or password!");
			}else{
				console.log("**got the user info**");
				if(response.user.password!=$("#password").val()||response.user.email!=$("#username").val()){
					alert("Invalid username or password!");
				}else{
					window.location.href = 'shome.html';
				}
			}
		});
	});
});
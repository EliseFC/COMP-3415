//MSESSION.JS
//FOR TRACKING MANAGER SESSION, CHANGE AS NEEDED
$( document ).ready(function(){
	var creds;
	if(sessionStorage.managerSession){
		creds = JSON.parse(sessionStorage.managerSession);
		
		getUserByEmail(creds.username,function(response){
			if(!response.success){
				console.log("**Didn't get the user info**"+response.error_message);
				bootMe();
			}else{
				if(response.user.password!=creds.password){
					bootMe();
				}
			}
		});
	}else{
		bootMe();
		window.location.href = 'index.html';
	}
	function bootMe(){
		alert("Incorrect login info, or session expired!");
		window.location.href = 'index.html';
	}
	//if all is OK
	$("#logUser").html("Logged in as: "+creds.username);
});
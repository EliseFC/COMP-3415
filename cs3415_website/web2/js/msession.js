//MSESSION.JS
//FOR TRACKING MANAGER SESSION, CHANGE AS NEEDED
$( document ).ready(function(){
	var testing;
	if(sessionStorage.managerSession){
		testing = JSON.parse(sessionStorage.managerSession);
		//alert("Username: " + testing.username + "\nPassword:: " + testing.password);
	}else{
		alert("Session Expired");
		window.location.href = 'index.html';
	}
});
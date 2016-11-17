$(document).ready(function(){
	$("#mlogin").click(function(){
		var creds = {
			username: $("#username").val(),
			password: $("#password").val(),
			time: $.now()
		}
		sessionStorage.setItem("managerSession",JSON.stringify(creds));
		window.location.href = 'mhome.html';
	});
	$("#slogin").click(function(){
		var creds = {
			username: $("#username").val(),
			password: $("#password").val(),
			time: $.now()
		}
		sessionStorage.setItem("studentSession",JSON.stringify(creds));
		window.location.href = 'shome.html';
	});
});
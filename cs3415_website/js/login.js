function slogin() {
  sessionStorage.setItem("logged","Yes");
  window.location.href = 'shome.html';
  return false;
}
$(document).ready(function(){
	$("#login").click(function(){
		var creds = {
			username: $("#username").val(),
			password: $("#password").val(),
			time: $.now()
		}
		sessionStorage.setItem("managerSession",JSON.stringify(creds));
		window.location.href = 'mhome.html';
	});
});
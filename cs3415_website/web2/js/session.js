$(document).ready(function(){
	var testing;
	if(sessionStorage.managerSession){
		testing = JSON.parse(sessionStorage.managerSession);
		alert("Username: " + testing.username + "\nPassword:: " + testing.password);
	}
	
	$(function(){
		$( "#selectable1" ).selectable();
		$("#resReq").button({
			disabled: true
		});
	});
});
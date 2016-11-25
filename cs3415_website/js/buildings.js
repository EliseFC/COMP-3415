$(document).ready(function() {
	$("#res_info").hide();
	$("#apt_info").hide();
	$("#th_info").hide();
	
	$("#res_open").click(function() {
		$("#res_open").hide();
		$("#res_info").slideToggle('slow');
	});
	
	$("#th_open").click(function() {
		$("#th_open").hide();
		$("#th_info").slideToggle('slow');
	});
	
	$("#apt_open").click(function() {
		$("#apt_open").hide();
		$("#apt_info").slideToggle('slow');
	});
});
$( document ).ready(function(){
	//load the main page
	$("#main-content").load("mmaincontent.html").hide().fadeIn('fast');
	$.getScript("./js/mainpage.js");
	
	//TAB Functions for loading the different pages
	$("#bldgTab").click(function(){
		$(".navTab").each(function(){
			$(this).removeClass("isSel");
		});
		$("#bldgTab").addClass("isSel");
		//load main page content, run queries for resident/housing requests
		$("#main-content").fadeOut('fast');
		$("#main-content").load("buildingmanage.html").hide().fadeIn('fast');
		$.getScript("./js/buildingmanage.js");
		
	});
	$("#homeTab").click(function(){
		$(".navTab").each(function(){
			$(this).removeClass("isSel");
		});
		$("#homeTab").addClass("isSel");
		//load home page content, run queries for resident/housing requests
		$("#main-content").fadeOut('fast');
		$("#main-content").load("mmaincontent.html").hide().fadeIn('fast');
		$.getScript("./js/mainpage.js");
		
	});
	$("#userTab").click(function(){
		$(".navTab").each(function(){
			$(this).removeClass("isSel");
		});
		$("#userTab").addClass("isSel");
		//load user page content, run queries for resident/housing requests
		$("#main-content").fadeOut('fast');
		//load the page whenever i make it
	});
});
$( document ).ready(function(){
	//silly fade in effects for no good reason
	$("#welcome").hide();
	$("#logo").hide();
	$("#slog").hide();
	
	$("#welcome").fadeIn(function(){
		$("#logo").fadeIn(function(){
			$("#slog").fadeIn(function(){
				
			});
		});
	});
});
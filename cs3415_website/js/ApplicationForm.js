	
$(document).ready(function(){
    $("#saveApplication").click(function(){
        alert("You Application has down!"+$(".selected").attr('id'));
    });
	
	$("#main_list li").click(function(){
		$("#main_list li").removeClass("selected");
		$(this).addClass("selected").siblings();
	});
	
	
});
$(document).ready(function(){
	var buildings;

	getBuildings(function(response){
	if(!response.success){
	console.log("error getting buildings"+response.error_message);
	}else{
	buildings = response.buildings;
	console.log("**Sucessfully fetched buildings!**");
	}	
	
	
    $("#saveApplication").click(function(){
        
		addReqs(student_id,"hello",building[0].id, function(res) {
        	if (!res.success) {
        		// something went wrong
				alert(res.errorMsg);
        	} else {
        		// user created
        		
        	}
        });
    });
	
	$("#main_list li").click(function(){
		$("#main_list li").removeClass("selected");
		$(this).addClass("selected").siblings();
	});
	
	
});
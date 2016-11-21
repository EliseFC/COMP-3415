function updateApplication(){
	$("#").empty();
	
	getBuildings(function(response){
		if(!response.success){
			console.log("error getting buildings");
		}else{
			buildings = response.buildings;
			buildings.forEach(function(entry){
				$("#buildings").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.name+': '+entry.type+'</li>');
			});
			console.log("**Sucessfully fetched buildings!**");
		}
	});
}

	
$(document).ready(function(){
    $("#saveApplication").click(function(){
        alert("You Application has down!");
    });
});
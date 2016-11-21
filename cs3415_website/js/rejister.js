function createAccount(){
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
    $("#saveRegister").click(function(){
        alert("You have create an account!");
    });
});


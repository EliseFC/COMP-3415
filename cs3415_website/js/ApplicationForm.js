$(document).ready(function(){
	var buildings;	
	var user;
	var student=JSON.parse(sessionStorage.getItem("studentSession"));
	
	getUserByEmail(student.username, function(response){
		if(!response.success){
			console.log("**Error get user inform**"+response.error_message);
		}else{
			console.log("**Successfully get user inform**");
			user = response.user;
			console.log(user);
			//check whether is first year level
			if(user.year<2){
				$("#secondyear").hide();
			}
	        }
		
		});
	
	//get the building type 
	getBuildings(function(response){
		if(!response.success){
			console.log("error getting buildings"+response.error_message);
		}else{
			buildings = response.buildings;
			console.log("**Sucessfully fetched buildings!**");
		}
	});

	//add new request
	$("#saveApplication").click(function(){
		addHousingRequest(user.user_id,$("#id_specialReqs").val(),buildings[0].id, function(response) {
					if(!response.success){
					console.log("error getting buildings"+response.error_message);
					}else{
					buildings = response.buildings;
					console.log("**Sucessfully fetched buildings!**");
					alert("Thanks for your application!");
					window.location.href = 'shome.html';
					}	
		        });
	});
	
	$(".page_section li").click(function(){
		$(".page_section li").removeClass("selected");
		$(this).addClass("selected").siblings();
	});
	
	
});
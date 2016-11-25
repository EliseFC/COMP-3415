/* User Account inform */
$(document).ready(function(){
	var buildings;	
	var user;
	var student=JSON.parse(sessionStorage.getItem("studentSession"));

	//get the building type 
	getBuildings(function(response){
		if(!response.success){
			console.log("error getting buildings"+response.error_message);
		}else{
			buildings = response.buildings;
			console.log("**Sucessfully fetched buildings!**");
		}
	});
	
		//display user profile
		getUserByEmail(student.username,function(response){
			if(!response.success){
				console.log("**Error retrieving user info**"+response.error_message);
			}else{
				console.log("**Successfully retrieved user info**");
				console.log(student);
				$("#Firstname").val(response.user.first_name);
				$("#Lastname").val(response.user.last_name);
				$("#Email").val(response.user.email);
				$("#year").val(response.user.year);
				$("#ID").val(response.user.student_number);
				
				getBuildings(function(res) {
					if(!res.success) {
						
					} else {
						var type = "Residence Hall";
						res.buildings.forEach(function(blndg) {
							console.log({ id: blndg.id.toString(), req_bid: response.user.request_building, bool: blndg.id === response.user.request_building})
							if (blndg.id.toString() === response.user.request_building) {
								type = blndg.type;
							}
						})
						$("#building").val(type);
					}
				});
			}
		});
		
		$("#saveUpdate").click(function(){
			updateUser($("#Email").val(),$("#Lastname").val(),$("#Firstname").val(),$("#year").val(),$("#ID").val(),function(response){
				if(!response.success){
					console.log("**Error update Information**"+response.error_message);
				}else{
					console.log("**Successfully update Information**"+response.error_message);
					alert("Your information have saved!");
					window.location.href = 'shome.html';
				}
			});
			
			
		});
		
	
});
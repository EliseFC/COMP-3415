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
				$("#building").val(response.user.request_building);	
			}
		});
		
	
});
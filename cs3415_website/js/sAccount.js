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
				document.getElementById("Firstname").value=response.user.first_name;
				document.getElementById("Lastname").value=response.user.last_name;
				document.getElementById("Email").value=response.user.email;
				document.getElementById("year").value=response.user.year;
				document.getElementById("ID").value=response.user.student_number;
				document.getElementById("building").value=response.user.request_building;
				
			}
		});
		
	
});
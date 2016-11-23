/*Account inform */

//function to update the user aplication
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
	//function applicationFrom(){
		getUserByEmail(student.username,function(response){
			if(!response.success){
				console.log("**Error retrieving user info**"+response.error_message);
			}else{
				console.log("**Successfully retrieved user info**");
			//Generate user info page
				$("#userDetails").html(
					'<table style="width:100%">'+
					'<tr><th class="dicttable">Student ID:</th><th>'+response.user.student_number+'</th></tr>'+
					'<tr><th class="dicttable">First Name:</th><th>'+response.user.first_name+'</th></tr>'+
					'<tr><th class="dicttable">Last Name:</th><th>'+response.user.last_name+'</th></tr>'+
					'<tr><th class="dicttable">Year Level:</th><th>'+response.user.year+'</th></tr>'+
					'<tr><th class="dicttable">Email:</th><th>'+response.user.email+'</th></tr>'+
					'<tr><th class="dicttable">House Request:</th><th>'+response.user.request_building+'</th></tr>'+
					'</table>'
				);
			}
		});
		//}
	
});


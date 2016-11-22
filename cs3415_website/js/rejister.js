
$(document).ready(function(){
    $("#saveRegister").click(function(){
		if($("#pwd").val()==$("#pwd2").val()){
			addUser(
			$('#id_First_name').val(),
			$("#id_Last_name").val(),
			$("#id_ID").val(),
			$("#id_year").index()+1,
			$("#id_Email").val(),
			$("#pwd").val(),function(response){
						if(!response.success){
							console.log("***error to create new account***"+response.error_message);
						}else{
							console.log("**Sucessfully Create an new account!**");
						}
					});
		}else{
			alert("passwords don't match");
		}
			});
});


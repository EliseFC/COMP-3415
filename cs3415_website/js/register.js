/* Send the account aplication to database */
$(document).ready(function(){
    $("#saveRegister").click(function(){
		if($("#pwd").val()==$("#pwd2").val()){
			addUser(
			$('#id_First_name').val(),
			$("#id_Last_name").val(),
			$("#id_ID").val(),
			$("#id_year option:selected").index()+1,
			$("#id_Email").val(),
			$("#pwd").val(),function(response){
						if(!response.success){
							console.log("***error to create new account***"+response.error_message);
						}else{
							console.log("**Sucessfully Create an new account!**");
							alert("You have create an account!");
							window.location.href = 'shome.html';
						}
					});
		}else{
			alert("***passwords don't match!***");
		}
			});
});


$( document ).ready(function(){

	var reqSelected;

	//disable newReq until user has housing
	$("#newReq").button({disabled: true});

	//select functions
	$("#myReqs").selectable({
		selected: function(event, ui) {
			$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
			reqSelected = $(ui.selected).text();
			$("#viewResreq").button({disabled: false});
		}                   
	});
});
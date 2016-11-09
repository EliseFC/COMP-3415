 // ref: http://stackoverflow.com/a/1293163/2343
    // This will parse a delimited string into an array of
    // arrays. The default delimiter is the comma, but this
    // can be overriden in the second argument.
    function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }

//our variables for what is selected
var bSelected, rSelected, fSelected;

var buildings,rooms,occupants,facilities;
//hide the facilities panel for now
$("#facPanel").hide();
//disable the buttons before anything is selected
$("#remBldg").button({disabled: true});
$("#viewRoom").button({disabled: true});
$("#addRoom").button({disabled: true});
$("#remRoom").button({disabled: true});
$("#addFac").button({disabled: true});
$("#remFac").button({disabled: true});

//hide view rooms button
$("#switchRoom").hide();

//building list generation
function updateBuildings(){
	$("#buildings").empty();
	
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

updateBuildings();

function updateRooms(){
	getRooms($('#buildings .ui-selected').attr('id'),function(response){
		$("#rooms").empty();
		if(!response.success){
			console.log("error fetching rooms");
		}else{
			rooms = response.rooms;
			rooms.forEach(function(entry){
				$("#rooms").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.number+'</li>');
			});
			console.log("**Sucessfully fetched rooms!**");
		}
	});
}

//select functions
$("#buildings").selectable({
	selected: function(event, ui) {
		//disable buttons that require room/facility selection
		$("#remRoom").button({disabled: true});
		$("#remFac").button({disabled: true});
		$("#viewRoom").button({disabled: true});
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");  
		bSelected = $(ui.selected).text();
		$("#remBldg").button({disabled: false});
		$("#addRoom").button({disabled: false});
		$("#addFac").button({disabled: false});
		//update room title
		$("#roomTitle").fadeOut('fast',function(){
			$("#roomTitle").html("Rooms in " + bSelected);
			$("#roomTitle").fadeIn('fast');
		});
		//generate room list (will be api query later)
		$("#rooms").slideUp('fast',function(){
			$("#rooms").empty();
			updateRooms();
			$("#rooms").slideDown('fast');
		});
		//generate facilities list (query query blahblah)
		$("#facilitesList").empty();
		facilities = CSVToArray('blah,bleeh,blaohh,awblahahaa',',');
		console.log(facilities[1]);
	}
});
$("#rooms").selectable({
	selected: function(event, ui) { 
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
		rSelected = $(ui.selected).text();			
		$("#viewRoom").button({disabled: false});
		$("#remRoom").button({disabled: false});
	}                   
});

//Add building button
$("#newBldg").click(function(event){
	$("#dialog-addBldg").dialog("open");
});

//Dialog to add building
$("#dialog-addBldg" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			//function(name, type, facilities, callback
			addBuilding($("#buildingName").val(),$("#buildingType").val(),$("#buildingFacilities").val(),function(response){
				if(!response.success){
					console.log("***ERROR adding building***" +response.error_message);
				}else{
					console.log("**Sucessfully saved new building!**");
					$( this ).dialog( "close" );
			
				$("#buildings").fadeOut(function(){
					updateBuildings();
				});
				$("#buildings").fadeIn();
				}
			});
			
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//Remove building button
$("#remBldg").click(function(event){
	$("#remBldgDetails").html("Removing: " + bSelected);
	$("#dialog-remBldg").dialog("open");
});

//Dialog to remove building
$("#dialog-remBldg" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			removeBuilding($('#buildings .ui-selected').attr('id'),function(response){
				if(!response.success){
					console.log("error removing building");
					alert("whoops!");
				}else{
					console.log("**Sucessfully removed!**");
				}
			});
			$("#buildings").fadeOut(function(){
				updateBuildings();
			});
			$("#buildings").fadeIn();
			
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//facilities selectable list
$("#facilitesList").selectable({
	selected: function(event, ui) { 
		$(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected"); 
		fSelected = $(ui.selected).text();			
		$("#remFac").button({disabled: false});
	}                   
});

//view facilites button
$("#viewFac").click(function(event){
	$("#viewFac").hide();
	$("#switchRoom").show();
	$("#roomPanel").fadeOut('fast',function(){
		$("#facPanel").fadeIn('fast');
	});
});
//view rooms button
$("#switchRoom").click(function(event){
	$("#switchRoom").hide();
	$("#viewFac").show();
	$("#facPanel").fadeOut('fast',function(){
		$("#roomPanel").fadeIn('fast');
	});
});

//dialog view room
$("#dialog-viewRoom" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 550,
	modal: true,
	buttons: {
		"OK": function() {
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});
//dialog edit room equipment
$("#dialog-editEquip" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//edit equipment button
$("#editEquip").click(function(event){
	$("#dialog-editEquip").dialog("open");
});


//view room button
$("#viewRoom").click(function(event){
	getOccupants($('#rooms .ui-selected').attr('id'),function(response){
		if(!response.success){
			console.log("***error getting occupants***"+response.error_message);
		}else{
			occupants = response.occupants;
			console.log("**Sucessfully got occupants!**");
			$("#roomDetails").html(
			'Building: ' + bSelected +
			'<br>Room Number: ' + rSelected +
			'<br>Devices: ' + rooms[$('#rooms .ui-selected').index()].devices +
			'<br>Occupant(s): '+
			'<div style="height:65%;width:100%;overflow-y:scroll">'+
			'<ol class="selectlist" id="oList">'+
			'</ol>'+
			'</div>'
			);
			if(occupants){
				occupants.forEach(function(entry){
					$("#oList").append('<li class="style=ui-widget-content" id="'+entry.id+'">'+entry.student+': '+entry.name+'<br>'+entry.start_date+'->'+entry.end_date+'</li>');
				});
			}else{
				$("#oList").append('<li class="style=ui-widget-content">Unoccupied</li>');
			}
			
			
			$("#dialog-viewRoom").dialog("open");
		}
	});
	
});

//dialog addrooom
$("#dialog-addRoom" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			//function(roomNo, buildingID, devices, callback)
			addRoom($("#newRoomName").val(),$('#buildings .ui-selected').attr('id'),$("#newRoomDevices").val(),function(response){
				if(!response.success){
					console.log("***error adding room***"+response.error_message);
					alert("whoops!");
				}else{
					console.log("**Sucessfully saved new room!**");
				}
			});
			updateRooms();
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//add room button
$("#addRoom").click(function(event){
	$("#addRoomDetails").html("Adding room to " + bSelected);
	$("#dialog-addRoom").dialog("open");
});

//dialog remove room
$("#dialog-remRoom" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			removeRoom($('#rooms .ui-selected').attr('id'),function(response){
				if(!response.success){
					console.log("**ERROR removing room**");
				}else{
					console.log("**Sucessfully removed!**");
				}
			});
			updateRooms();
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//remove room button
$("#remRoom").click(function(event){
	$("#remRoomDetails").html("Removing: " + rSelected);
	$("#dialog-remRoom").dialog("open");
});

//dialog addfac
$("#dialog-addFac" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//add facility button
$("#addFac").click(function(event){
	$("#addFacDetails").html("Editing facilities for " + bSelected);
	$("#dialog-addFac").dialog("open");
});

//dialog remove fac
$("#dialog-remFac" ).dialog({
	autoOpen: false,
	resizable: false,
	height: "auto",
	width: 300,
	modal: true,
	buttons: {
		"OK": function() {
			$( this ).dialog( "close" );
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	hide: 'fold',
	show: 'fold'
});

//remove fac button
$("#remFac").click(function(event){
	$("#remFacDetails").html("Removing: " + fSelected);
	$("#dialog-remFac").dialog("open");
});
var getFromDB = function(usernameToGet, callback) {
	api("?id=0&username=" + usernameToGet, callback);
}

var getBuildings = function(callback) {
	api("?id=1", callback);
}

var addBuilding = function(name, type, facilities, callback) {
	api("?id=2&name=" + name + "&type=" + type + "&facilities= " + facilities, callback);
}

var removeBuilding = function(id, callback) {
	api("?id=3&buildingID=" + id, callback);
}

var getRooms = function(buildingID, callback) {
	api("?id=4&buildingID=" + id, callback);
}

var addRoom = function(roomNo, buildingID, devices, callback) {
	api("?id=5&roomNumber=" + roomNo + "&buildingID=" + buildingID + "&devices=" + devices, callback);
}

var removeRoom = function(id, callback) {
	api("?id=6&roomID=" + id, callback);
}

var getOccupants = function(roomID, callback) {
	api("?id=7&roomID=" + roomID, callback);
}

var getIssues = function(buildingID, callback) {
	api("?id=8&buildingID=" + id, callback);
}

var api = function(params, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        callback(JSON.parse(this.responseText));
      } else if(this.readyState == 4) {
        callback(JSON.parse('{"success":false, "error_message":""}'));
      }
    };
	xhr.open("GET", "http://158.69.208.150:8887/" + params, true);
    xhr.send();
}
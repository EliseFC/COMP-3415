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
	api("?id=4&buildingID=" + buildingID, callback);
}

var addRoom = function(roomNo, buildingID, devices, capacity, callback) {
	api("?id=5&roomNumber=" + roomNo + "&buildingID=" + buildingID + "&devices=" + devices + "&capacity=" + capacity, callback);
}

var removeRoom = function(id, callback) {
	api("?id=6&roomID=" + id, callback);
}

var getOccupants = function(roomID, callback) {
	api("?id=7&roomID=" + roomID, callback);
}

var getIssues = function(buildingID, callback) {
	api("?id=8&buildingID=" + buildingID, callback);
}

var updateDevices = function(roomID, devices, callback) {
	api("?id=9&roomID=" + roomID + "&devices=" + devices, callback);
}

var updateFacilities = function(buildingID, facilities, callback) {
	api("?id=10&buildingID=" + buildingID + "&facilities=" + facilities, callback);
}

var removeOccupant = function(student_id, callback) {
	api("?id=11&studentID=" + student_id, callback);
}

var addIssue = function(student_id, building_id, issue, callback) {
	api("?id=12&userID=" + student_id + "&buildingID=" + building_id + "&issue=" + issue, callback);
}

var setIssueStatus = function(issue_id, status, callback) {
	api("?id=13&issueID=" + issue_id + "&status=" + status, callback);
}

var removeIssue = function(issue_id, callback) {
	api("?id=14&issueID=" + issue_id, callback);
}

var getNotifications = function(building_id, callback) {
	api("?id=15&buildingID=" + building_id, callback);
}

var addNotification = function(building_id, notification, callback) {
	api("?id=16&buildingID=" + buildingID + "&notification=" + notification, callback);
}

var removeNotification = function(notification_id, callback) {
	api("?id=17&notificationID = " + notification_id, callback);
}

var addHousingRequest = function(student_id, request, requested_building_id, callback) {
	api("?id=18&studentID=" + student_id + "&request=" + request + "&buildingID=" + requested_building_id, callback);
}

var getHousingRequests = function(callback) {
	api("?id=19", callback);
}

var approveRequest = function(student_id, room_id, callback) {
	api("?id=20&studentID=" + student_id + "&roomID=" + room_id, callback);
}

var denyRequest = function(student_id, callback) {
	api("?id=21&studentID=" + student_id, callback);
}

var getUsers = function(callback){
	apt("?id=24", callback);
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
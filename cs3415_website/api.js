var getFromDB = function(usernameToGet, callback) {
	getJSONResponse("?id=0&username=" + usernameToGet, callback);
}

var getJSONResponse = function(params, callback) {
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
function repeatedlySendRequest() { 
	var req = new XMLHttpRequest(); 
	req.open("GET", "http://localhost:9000/", true); 
	req.send(null); 
	req.addEventListener("load", function() {
		var data = JSON.parse(req.responseText); 
		hatServer.emit(data.eventStr, data); 
		repeatedlySendRequest(); 
	}); 
}
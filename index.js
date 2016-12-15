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

function sendChatEntranceRequest(username) {   
	var req = new XMLHttpRequest();   
	req.open("GET", "http://localhost:9000/?user=" + username, true);  
	req.send(null); // send request w/no request body (used for POST requests)  
	req.addEventListener("load", function() { 
		console.log(req.responseText);
		repeatedlySendRequest();
	}); 
}

document.getElementById("msgSubmitButton").addEventListener("click", function() { 
 	var msg      = document.getElementById("messageField").value; 
  	var username = document.getElementById("hiddenField").value; // other options? 
    sendMessage(username, message); // implement like sendChatEntranceRequest, refactoring?
});

function sendMessage(message){
	var req = new XMLHttpRequest();
	req.open("GET", "http://localhost:9000/?user=" + username + "?message=" + message, true);
	req.send(null);
	}
var Router = module.exports = function() {
		routes = [];
	};

var http = require("http");
var chatList = [];
var server = http.createServer(function(request, response){
		response.name = request.connection.remoteAddress + ":" + request.connection.remotePort;
		response.writeHead(200, {"Content-Type": "text/html", "Access-control-allow-origin": "*"});
		response.write("<h1>Hello " + response.name + "!</h1><p>You asked for <code>" + request.url + "</code></p>");	
		chatList.push(response);
		broadcast(response.name + " entered the chat room.\n", response.name);
		console.log(chatList)
	});

/*function chatServer.on('connection', function(client){
	client.name = client.remoteAddress + ":" + client.remotePort;
	client.write('Chat Server : Welcome to Chat, ' + client.name + '\n'); 
	clientList.push(client); 
	broadcast(client.name + " entered the chat room.\n", {name: "Chat Server"}); 
	client.on('data', function(data){
		broadcast(data, client);
	});
*/
server.listen(8000);

function broadcast(message, client){
		var removechatList = [];
		chatList.forEach(function(participant){
			var data = JSON.stringify(chatList(participant));
			if(participant !== client){
					participant.write(client.name + " : " + message);
				}
		});
	}

function addRoute(method, url, handler){
		routes.push({method: method,
						url: url,
						handler: handler});
	};

function resolve(request, response){
		var path = require("url").parse(request.url).pathname;

		return routes.some(function(route){
			var match = route.url.exec(path);
			if (!match || route.method != request.method)
				return false;

			var urlParts = match.slice(1).map(decodeURIComponent);
			route.handler.apply(null, [request, response]
										.concat(urlParts));

			return true;
			});	
	};
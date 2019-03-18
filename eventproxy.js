var express = require('express');
var EventSource = require("eventsource");

var app = express();
//var port = process.env.PORT;
var port = 9001;

app.use(express.static('.'));

clients = []; // array/list of sse clients

app.get('/eta', function(req,res) {
	req.socket.setTimeout(Number.MAX_VALUE);
	res.writeHead(200, {
		'Content-Type': 'text/event-stream', // <- Important headers
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'});
	res.write('\n');
	clients.push(res);

});

var es = new EventSource("https://stream.transit.usft.com/eta");
es.onmessage = function(e) {
	for(let r of clients) {
		r.write("data: " + e.data + "\n\n"); // needs TWO newlines for browser to see it!
	}
	console.log(e.data);
}



app.listen(port);

console.log("now listening on port " + port);

module.exports = app;

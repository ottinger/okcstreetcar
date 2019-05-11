var express = require('express');
var EventSource = require("eventsource");

var app = express();
var port = process.env.PORT || 9001;

app.use(express.static('public'));

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

var currentStopTimes = {};
var currentStops = {};
var currentRoutes = {};
app.get('/api/:stopId', function(req,res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(currentStops[req.params.stopId]);
});

var es = new EventSource("https://stream.transit.usft.com/eta");
es.onmessage = function(e) {
	// Rebroadcast data to clients
	for(let r of clients) {
		r.write("data: " + e.data + "\n\n"); // needs TWO newlines for browser to see it!
	}

	// Load it into our arrays for our use
	var m = JSON.parse(e.data);
	// fill stop information
	if(!currentStops[m.stopId])
		currentStops[m.stopId] = {name: m.stopName};
	if(!currentStops[m.stopId][m.routeId])
		currentStops[m.stopId][m.routeId] = {name: m.routeName,
			stopId: m.stopId,
			times: [m.firstDuration, m.secondDuration, m.thirdDuration]};
	else
		currentStops[m.stopId][m.routeId].times = [m.firstDuration, m.secondDuration, m.thirdDuration];


	console.log(m);
}



app.listen(port);

console.log("now listening on port " + port);

module.exports = app;

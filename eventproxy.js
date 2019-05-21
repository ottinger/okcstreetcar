var express = require('express');
var EventSource = require("eventsource");

var app = express();
var port = process.env.PORT || 9001;

var DEBUG = true;

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

	// Check how long it's been since updated. If more than 2 minutes, wipe the times and
	// tell the user it's unavailable (since the times are probably no good).
	var cur_time = new Date();
	for (var rk in currentStops[req.params.stopId].routes) {
		var r = currentStops[req.params.stopId].routes[rk];
		var time_diff = cur_time - r.lastUpdated; // Time diff in milliseconds

		if(time_diff > 120000) {
			r.lastUpdated = cur_time;
			r.times = ["Not Available"];
		}
	}

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

	// set up stop objects if we need to
	if(!currentStops[m.stopId])
		currentStops[m.stopId] = {name: m.stopName, stopId: m.stopId, routes: {}};
	if(!currentStops[m.stopId].routes[m.routeId])
		currentStops[m.stopId].routes[m.routeId] = {name: m.routeName,
			routeId: m.routeId};
	// load the times in, and update last updated
	currentStops[m.stopId].routes[m.routeId].times = [m.firstDuration, m.secondDuration, m.thirdDuration];
	currentStops[m.stopId].routes[m.routeId].lastUpdated = new Date();


	console.log(m);
}



app.listen(port);

console.log("now listening on port " + port);

module.exports = app;

// Debug stuff: lets us send our own output (fake arrival times) to client if OKC Streetcar API is down.
if(DEBUG) {
	const rl = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	})
	rl.on('line', (input_data) => {
		for(let r of clients) {
			r.write("data: " + input_data + "\n\n"); // needs TWO newlines for browser to see it!
		}
	})
}
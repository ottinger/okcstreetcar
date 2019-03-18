// eta.js
//
// Contains code to obtain ETA data via EventSource/SSE, and process it into
// an array.

// eventsource
var evts = new EventSource("eta"); // we don't need full url
console.log(evts.url);
console.log(evts.readyState);
console.log(evts.withCredentials);
evts.addEventListener("open", function(e) {
	console.log("OPEN SESAME");
}, false);

var etaStops = [];  // one element for each stop/route number
var curData = [];

evts.addEventListener("message", function(e) {

	// prepare the data
	curData = JSON.parse(e.data);
	if(etaStops[curData.stopId]==null)
		etaStops[curData.stopId] = []; // We use an array in case we have more than 1 route
	if(etaStops[curData.stopId][curData.routeId]==null)
		etaStops[curData.stopId][curData.routeId] = []; // array for 3 durations

	var curEtaStop = etaStops[curData.stopId];
	curEtaStop[curData.routeId] = [
		curData.firstDuration,
		curData.secondDuration,
		curData.thirdDuration
	];
	Vue.set(etaStops, curData.stopId, curEtaStop);
	// etaStops.$set(curData.stopId, curEtaStop);
	//console.log(curData.routeId + " " + curData.firstDuration);
}, false);

function setVueStops(inArr, id) {
	var etaStops = [];
	var curData = [];

	evts.addEventListener("message", function(e) {

		// prepare the data
		curData = JSON.parse(e.data);
		if(etaStops[curData.stopId]==null)
			etaStops[curData.stopId] = []; // We use an array in case we have more than 1 route
		if(etaStops[curData.stopId][curData.routeId]==null)
			etaStops[curData.stopId][curData.routeId] = []; // array for 3 durations

		console.log("curdata.stopid: " + curData.stopId + "curdata.routeid: " + curData.routeId + " eta stops: " + etaStops[curData.stopId]);		

		// change the data for this route in etaStops
		var curEtaStop = etaStops[curData.stopId];
		curEtaStop[curData.routeId] = [
			curData.firstDuration,
			curData.secondDuration,
			curData.thirdDuration
		];
		etaStops[curData.stopId] = curEtaStop;

		// now save the changes to the vue model
		inArr.forEach(function(element,index) { Vue.set(inArr,index,null); });
		etaStops[id].forEach(function(element, index) {
			Vue.set(inArr, index, element);
		});

		// route names will be hardcoded in app.js for now
	}, false);

	return etaStops;
}

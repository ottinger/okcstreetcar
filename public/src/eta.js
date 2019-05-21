// eta.js
//
// Contains code to obtain ETA data via EventSource/SSE, and process it into
// an array.

// eventsource
var evts = new EventSource("eta"); // we don't need full url
var etaStops = [];  // one element for each stop/route number
var curData = [];

function setVueStops(inArr, id) {
	// Remove previously created event listeners
	evts.removeEventListener("message", handleEvent, false);

	// removing event listeners doesn't seem to do the job, but closing and reopening eventsource
	// does
	evts.close();
	evts = new EventSource("eta");

	// The code inside the event listener runs once for each stop, each route, every time we get new arrival times.
	evts.addEventListener("message", handleEvent, false);

	// handleEvent()
	//
	// Function called by the EventListener created in setVueStops().
	//
	// Anonymous function will not suffice here, since we need to be able to call removeEventListener()
	// to remove the listener (ie when a different stop is chosen).
	//
	// Also we have to use closures to allow access to variables when called by addEventListener (thus why
	// it's nested inside setVueStops()).
	function handleEvent(e) {
		// prepare the data
		curData = JSON.parse(e.data); // Arrival times for one stop, one route
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

		// Update the Vue model if the event has times for the selected stop.
		if(curData.stopId == id) {
			console.log("Hit: " + curData.stopId);
			// now save the changes to the vue model
			etaStops[id].forEach(function(element, index) {
				Vue.set(inArr, index, element);
			});
		}
	}
}

export { setVueStops };
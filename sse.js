const Vue = require('vue');
const eventsource = require('eventsource');

var evtSource = new EventSource("https://stream.transit.usft.com/eta");

console.log("hi");


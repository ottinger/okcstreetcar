import { setVueStops } from './eta.js';
import $ from 'jquery';
import 'leaflet-polylineoffset';

var app = new Vue({
	el: '#app',

	data: {
		map: null,
		tileLayer: null,
		layers: [
			{}
			],
		currentStop: {
			id: 0,
			name: "Select a stop",
			arrivals: [],
			routeNames: [null,"Downtown",null,null,null,"Bricktown"],
			routeColors: [null, "E70F47",null,null,null,"3C20AE"],
		},
	 },

	mounted() {
		this.initMap();
		this.initLayers();
		},

	methods: {
		initMap() {
			this.map = L.map('map').setView([35.4705, -97.515], 15);
			this.tileLayer = L.tileLayer(
 				 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
  				{
    					maxZoom: 18,
    					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  			});
			this.tileLayer.addTo(this.map);
		},
		initLayers() {
			$.getJSON("stops.geojson", function(data) {
				L.geoJSON(data,
					{
						onEachFeature: function(feature, featureLayer) {
							featureLayer.on({
								click: function(e) { app.setArrivals(e.target.feature.properties); }
							})
						}
					}).addTo(app.map);
			});

			$.getJSON("lines.geojson", function(data) {
				L.geoJSON(data, { style: function(route) {
					if(route.properties.routeId == 1) // Downtown Loop
						return {color: "#E70F47", weight: 5};
					if(route.properties.routeId == 5)
						return {color: "#3C20AE", weight: 5, offset: 5};
				}}).addTo(app.map);
			})

		},
		toCurLocation() {
			// Will likely not work except on localhost - requires https
		    app.map.locate({setView: true, maxZoom: 17});
		},
		toPickedStop(id) {
			let stopObj = app.layers[0].features.find(obj => {return obj.id === id});
			app.map.flyTo(new L.LatLng(stopObj.coords[0], stopObj.coords[1]), 17.5);
			app.setArrivals(stopObj);
		},
		// setArrivals()
		//
		// Change the information in the arrivals panel to reflect stop chosen
		// Called by toPickedStop(), initLayers()
		setArrivals(stopObj) {
			app.currentStop.name = stopObj.stopName;

			// wipe arrivals before we get next data
			app.currentStop.arrivals = [];

			setVueStops(app.currentStop.arrivals,stopObj.stopId);
			app.currentStop.id = stopObj.stopId;
		},
		
	 },

});






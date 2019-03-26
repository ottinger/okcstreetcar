var app = new Vue({
	el: '#app',

	data: {
		map: null,
		tileLayer: null,
		layers: [
				stopsLayer,
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
		this.initArrivals();
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
			var markers = [];
			var parentVue = this;
	
			console.log(this.layers[0]['features']);	
			this.layers[0]['features'].forEach(function(element) {
					console.log(parent);
					var curMarker = L.marker(element.coords).addTo(parentVue.map);
					markers.push(curMarker);
					curMarker.on('click', function() {
						console.log(element);
						app.currentStop.name = element.name;

						// wipe arrivals before we get next data
						app.currentStop.arrivals = [];	

						setVueStops(app.currentStop.arrivals,element.id);
						app.currentStop.id = element.id;
						console.log(curData);

					});
					console.log(element.name);
				});


		},
		initArrivals() {


		},
		toCurLocation() {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					app.map.flyTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 17);
				},
					function(position) {
						alert("NOTE: will usually not work on non-HTTPS " + position.message)
					});
			} else {
				alert("poop");
			}
		},
		toPickedStop(id) {
			let stopObj = stopsLayer.features.find(obj => {return obj.id === id});
			app.map.flyTo(new L.LatLng(stopObj.coords[0], stopObj.coords[1]), 17.5);
			// TODO: make a function for this to avoid duplicated code with initLayers()
			app.currentStop.name = stopObj.name;

			// wipe arrivals before we get next data
			app.currentStop.arrivals = [];

			setVueStops(app.currentStop.arrivals,stopObj.id);
			app.currentStop.id = stopObj.id;
		},
		
	 },

});






var stopsList = [
  {
    "stopId": 1,
    "stopName": "East Bricktown",
    "coords": [
      35.4651881,
      -97.5061054
    ]
  },
  {
    "stopId": 2,
    "stopName": "Ballpark",
    "coords": [
      35.4642933,
      -97.5086556
    ]
  },
  {
    "stopId": 3,
    "stopName": "Santa Fe Hub",
    "coords": [
      35.4642861,
      -97.5116748
    ]
  },
  {
    "stopId": 4,
    "stopName": "Arena",
    "coords": [
      35.4643242,
      -97.5146145
    ]
  },
  {
    "stopId": 5,
    "stopName": "Scissortail Park",
    "coords": [
      35.462533,
      -97.5174235
    ]
  },
  {
    "stopId": 6,
    "stopName": "Myriad Gardens",
    "coords": [
      35.4659933,
      -97.5194595
    ]
  },
  {
    "stopId": 7,
    "stopName": "Library",
    "coords": [
      35.4684786,
      -97.519436
    ]
  },
  {
    "stopId": 8,
    "stopName": "Transit Center",
    "coords": [
      35.4717115,
      -97.5193718
    ]
  },
  {
    "stopId": 9,
    "stopName": "Federal Courthouse",
    "coords": [
      35.4718526,
      -97.5147592
    ]
  },
  {
    "stopId": 10,
    "stopName": "Broadway Avenue",
    "coords": [
      35.4727804,
      -97.5142626
    ]
  },
  {
    "stopId": 11,
    "stopName": "Automobile Alley",
    "coords": [
      35.4755509,
      -97.5141708
    ]
  },
  {
    "stopId": 12,
    "stopName": "Art Park",
    "coords": [
      35.4797627,
      -97.5139675
    ]
  },
  {
    "stopId": 13,
    "stopName": "North Hudson",
    "coords": [
      35.480061,
      -97.5184252
    ]
  },
  {
    "stopId": 14,
    "stopName": "Dewey Avenue",
    "coords": [
      35.4794281,
      -97.5227026
    ]
  },
  {
    "stopId": 15,
    "stopName": "Midtown",
    "coords": [
      35.4782112,
      -97.51949
    ]
  },
  {
    "stopId": 16,
    "stopName": "NW 10th Street",
    "coords": [
      35.4781452,
      -97.5164615
    ]
  },
  {
    "stopId": 17,
    "stopName": "Law School",
    "coords": [
      35.475241,
      -97.5162528
    ]
  },
  {
    "stopId": 18,
    "stopName": "Memorial Museum",
    "coords": [
      35.4724722,
      -97.516348
    ]
  },
  {
    "stopId": 19,
    "stopName": "Business District",
    "coords": [
      35.4692376,
      -97.5164677
    ]
  },
  {
    "stopId": 20,
    "stopName": "Century Center",
    "coords": [
      35.466394,
      -97.5148481
    ]
  },
  {
    "stopId": 21,
    "stopName": "Bricktown",
    "coords": [
      35.4664112,
      -97.5110911
    ]
  },
  {
    "stopId": 22,
    "stopName": "Mickey Mantle",
    "coords": [
      35.4663935,
      -97.5092885
    ]
  }
];

function getMarkers() {
	var stops = [];
	stopsList.forEach(function(element) {
		var curFeature = {
			id: element['stopId'],
			name: element['stopName'],
			type: "marker",
			coords: element['coords']
		};
		stops.push(curFeature);
	});
	return stops;
}

var stopsLayer =
    {
      id: 0,
      name: "Streetcar Stops",
      active: true,
      features: getMarkers()
    };


export { stopsList, getMarkers, stopsLayer };
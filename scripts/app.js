// sanity check
console.log('working');
// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var icon = {
    url: "earthquake.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

$(document).on("ready", function() {

  createMap();

});

function createMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44},
      zoom: 2
    });

}

// function getQuakeList () {

  $.ajax ({
  	method: "GET",
  	url: weekly_quakes_endpoint,
  	dataType: "json",
  	success: onSuccess,
  	error: onError
  });

// }

function onSuccess(json) {

  console.log(json);
  console.log(json.features[0].properties.mag);

  var quakes = json.features;

  for (quake of quakes) {

    // declare variable for each string
    var mag = quake.properties.mag;
    var place = quake.properties.place;

    $('#info').append("<p>" + quake.properties.title + "</p>");

    // create a map marker
    lat = quake.geometry.coordinates[1];
    lng = quake.geometry.coordinates[0];

    new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: quake.properties.title,
      icon: icon
    });

  }

}

function onError(xhr, status, errorThrown) {

	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);

}
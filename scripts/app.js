// sanity check
console.log('working');
// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {

  $.ajax ({
  	method: "GET",
  	url: weekly_quakes_endpoint,
  	dataType: "json",
  	success: onSuccess,
  	error: onError
  })
  function onSuccess(json) {
  	console.log(json);
  	console.log(json.features[0].properties.mag);
  }

  function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
  }

});

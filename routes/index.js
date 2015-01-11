var express = require('express');
var router = express.Router();

var google_geocoding = require('google-geocoding');




// Require the module
var Forecast = require('forecast');

// Initialize
var forecast = new Forecast({
  service: 'forecast.io',
  key: '282ada6f6296e3defd8348b80069d30d',
  units: 'celcius', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
    }
});


/* GET home page. */
router.get('/', function(req, res) {

	google_geocoding.geocode('London, UK', function(err, location) {

	    if( err ) {
	        console.log('Error: ' + err);
	    } else if( !location ) {
	        console.log('No result.');
	    } else {
	        console.log('Latitude: ' + location.lat + ' ; Longitude: ' + location.lng);
	    }


		forecast.get([location.lat, location.lng], function(err, weather) {
		if(err) return console.dir(err);
		var img = "/images/" + weather.currently.icon + ".jpg";		
		res.render('index', {messagecontent: weather.timezone, currentWeather: weather.currently.summary, title: 'Wear For The Weather'});
		});

	});
});

router.post('/search', function(req, res) {

	google_geocoding.geocode(req.body.myDestination, function(err, location) {

	    if( err ) {
	        console.log('Error: ' + err);
	    } else if( !location ) {
	        console.log('No result.');
	    } else {
	        console.log('Latitude: ' + location.lat + ' ; Longitude: ' + location.lng);
	    }


		forecast.get([location.lat, location.lng], function(err, weather) {
			if(err) return console.dir(err);	
			var img = "/images/" + weather.currently.icon + ".jpg";		

			if (weather.currently.icon == 'partly-cloudy-night'){
				console.log("partly-cloudy-night");
			} else if (weather.currently.icon == 'clear-day'){
				console.log("clear-day");
			} else if (weather.currently.icon == 'clear-night'){
				console.log("clear-night");
			} else if (weather.currently.icon == 'rain'){
				console.log("rain");
			} else if (weather.currently.icon == 'snow'){
				console.log("snow");
			} else if (weather.currently.icon == 'sleet'){
				console.log("sleet");
			} else if (weather.currently.icon == 'wind'){
				console.log("wind");
			} else if (weather.currently.icon == 'cloudy'){
				console.log("cloudy");
			} else if (weather.currently.icon == 'partly-cloudy-day'){
				console.log("partly-cloudy-day");
			} else if (weather.currently.icon == 'fog'){
				console.log("fog");
			};

			res.render('index', {messagecontent: weather.timezone, currentWeather: weather.currently.summary, title: 'Wear For The Weather', image : img});
		});

	});

});







module.exports = router;


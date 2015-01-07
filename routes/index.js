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
		res.render('index', {messagecontent: weather.timezone, currentWeather: weather.currently.summary, title: 'Wear For The Weather'});
			
			if (weather.currently.icon == 'partly-cloudy-night'){
				router.render('index', { iconHere :"raincoat" });
				console.log('raincoat');
			} else if (weather.currently.icon == 'clear-day'){
				console.log('sunglasses');
			};


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
		res.render('index', { messagecontent: weather.timezone, currentWeather: weather.currently.summary, title: weather.timezone});
			
			if (weather.currently.icon == 'partly-cloudy-night'){
				console.log("coat");
			} else if (weather.currently.icon == 'clear-day'){
				console.log("sunglasses");
			};
		});

	});

});








module.exports = router;


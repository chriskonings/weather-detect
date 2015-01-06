(function() {
    var noGeolocation = function() {
        alert("For some reason we are unable to find your location. Sorry.");
    };

    if (!navigator.geolocation || !document.querySelector) {
        noGeolocation();
    }
    else {
        navigator.geolocation.getCurrentPosition(
            function(p) {
                console.log(p.coords.latitude);
            },
            function(err) {
                noGeolocation();
            }
        );
    }
})();


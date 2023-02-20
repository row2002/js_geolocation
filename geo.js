$(function() {
	var lastCheckedPosition,
        locationEventCount = 0,
        watchID,
		timerID;
	var options = {
		maxWait: 10000,       // 10 секунд
		desiredAccuracy: 500, // точность - 500 метров
		timeout: 10000,
		maximumAge: 0,
		enableHighAccuracy: true
	};	
		
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
 	}
	
	function geolocationSuccess(position) {
		if (!position || !position.coords) return;
		
		var latitude  = position.coords.latitude;
		var longitude = position.coords.longitude;
		var accuracy = position.coords.accuracy;

		alert('lat: ' + latitude + '\n' + 'lng: ' + longitude + '\n' + 'accuracy: ' + accuracy);
	}
	
	function geolocationError(error) {
		alert('Unable to retrieve location. Error: ' + error);
	}
	
	var checkLocation = function (position) {
        lastCheckedPosition = position;
        locationEventCount = locationEventCount + 1;
        
        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        }
	};
	
	var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    };

    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
	};
	
	var foundPosition = function (position) {
        geolocationSuccess(position);
	};
	
	if (isMobile() && navigator.geolocation) {
		watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
		timerID = setTimeout(stopTrying, options.maxWait);
	}
});
YUI().use("io-base", function(Y) {

    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);
    };

    Y.on('io:complete', complete, Y);

    function supports_geolocation() {
        return !!navigator.geolocation;
    }

    handle_success = function handle_success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var speed = position.coords.speed;

        Y.log(latitude, longitude, speed);
        Y.io("data.php");
    }

    handle_error = function handle_error(e) {
        if (e.code == 1) {
            Y.log("user said no");
        }
    }

    if (supports_geolocation()) {
        navigator.geolocation.getCurrentPosition(handle_success, handle_error);
    } else {
        Y.log("no decent browser");
    };


});
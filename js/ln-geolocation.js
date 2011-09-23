YUI.add('ln-geolocation', function(Y) {

    Y.namespace('ln');

    Y.ln.geolocation = function() {

        var checkSupport,
            handle_success,
            handle_error;

        checkSupport = function() {
            return !!navigator.geolocation;
        }

        handle_success = function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            Y.log("latitude: "+latitude);
            Y.log("longitude: "+longitude);
        }

        handle_error = function(e) {
            if (e.code == 1) {
                Y.log("user said no");
            }
        }

        return {
            getCoords: function() {
                if (checkSupport()) {
                    navigator.geolocation.getCurrentPosition(handle_success, handle_error);
                } else {
                    Y.log("browser not capable");
                    return false;
                }
            }
        }

    }();
}, '0.0.1');
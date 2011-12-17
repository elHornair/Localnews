/*global window, navigator, YUI */
YUI.add('ln-geolocation', function(Y) {
    "use strict";
    Y.namespace('ln');

    Y.ln.geolocation = function() {

        var checkSupport,
            handle_success,
            handle_error,

        _checkSupport = function() {
            return !!navigator.geolocation;
        },

        _dispatchReceivedCoords = function(position) {
            Y.fire('ln-geolocation:onReceivedCoords', {
                long: position.coords.longitude,
                lat: position.coords.latitude
            });
        },

        _dispatchNoCoords = function(e) {
            Y.fire('ln-geolocation:onNoCoords');
        };

        return {
            askForCoords: function() {
                if (_checkSupport()) {
                    navigator.geolocation.getCurrentPosition(_dispatchReceivedCoords, _dispatchNoCoords);
                } else {
                    _dispatchNoCoords();
                }
            }
        }

    }();
}, '0.0.1');
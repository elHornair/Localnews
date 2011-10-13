YUI.add('ln-map', function(Y) {

    Y.namespace('ln');

    Y.ln.map = function() {

        var _cfg,

        _latitudeToLocal = function (latitude) {
            var containerWidth = Y.one(_cfg.mapDOMId).getStyle('width');
            containerWidth = containerWidth.substr(0, containerWidth.length-2);
            return containerWidth * ((latitude - _cfg.bBox[0]) / (_cfg.bBox[1] - _cfg.bBox[0]));
        },

        _longitudeToLocal = function (longitude) {
            var containerHeight = Y.one(_cfg.mapDOMId).getStyle('height');
            containerHeight = containerHeight.substr(0, containerHeight.length-2);
            return containerHeight * ((longitude - _cfg.bBox[2]) / (_cfg.bBox[3] - _cfg.bBox[2]));
        },

        _handleMapClick = function (e) {
            var pointer = Y.one(_cfg.pointerDOMId);
            pointer.setStyle('left', e.pageX);
            pointer.setStyle('top', e.pageY);
            // TODO: dispatch event
        }

        return {

            init: function (cfg) {
                _cfg = cfg;
                Y.one(_cfg.mapDOMId).on('click', _handleMapClick)
                // TODO: init drag'n'drop for pointer
                // animation
                /*Y.one('#pointer').transition({
                    easing: 'ease-out',
                    duration: 0.75,
                    top: '200px',
                    left: '300px'
                }, function() {
                    //Y.log("feddig anim: "+this);
                });*/
            },

            setCoords: function (latitude, longitude) {
                var pointer = Y.one(_cfg.pointerDOMId);
                pointer.setStyle('left', _latitudeToLocal(latitude));
                pointer.setStyle('top', _longitudeToLocal(longitude));
            }

        }

    }();
}, '0.0.1', { requires: ['transition'] });
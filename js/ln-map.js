YUI.add('ln-map', function(Y) {

    Y.namespace('ln');

    Y.ln.map = function() {

        var _cfg,
            expanded = true,

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
            },

            setCoords: function (latitude, longitude) {
                var pointer = Y.one(_cfg.pointerDOMId);
                pointer.setStyle('left', _latitudeToLocal(latitude));
                pointer.setStyle('top', _longitudeToLocal(longitude));
            },

            toggleMap: function () {
                var newHeight,
                    newOpacity,
                    delay;

                if (expanded) {
                    newHeight = '0';
                    newOpacity = 0;
                    delay = 0;
                    expanded = false;
                } else {
                    newHeight = Y.one(_cfg.mapDOMId).getStyle('height');
                    newOpacity = 1;
                    delay = 0.3;
                    expanded = true;
                }

                // animation
                Y.one(_cfg.containerDOMId).transition({
                    easing: 'ease-out',
                    duration: 0.6,
                    height: newHeight,
                }, function() {
                    Y.log("feddig anim: "+this);
                });

                Y.one(_cfg.pointerDOMId).transition({
                    easing: 'ease-out',
                    duration: 0.3,
                    delay: delay,
                    opacity: newOpacity
                });
            }

        }

    }();
}, '0.0.1', { requires: ['transition'] });
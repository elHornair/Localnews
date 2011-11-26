YUI.add('ln-map', function(Y) {

    Y.namespace('ln');

    Y.ln.map = function() {

        var _cfg,
            expanded = true,

        _longitudeToLocal = function (longitude) {
            var containerWidth = Y.one(_cfg.mapDOMId).getStyle('width');
            containerWidth = containerWidth.substr(0, containerWidth.length-2);
            return (longitude-_cfg.bBox[0])*containerWidth/(_cfg.bBox[1]-_cfg.bBox[0]);
        },

        _latitudeToLocal = function (latitude) {
            var containerHeight = Y.one(_cfg.mapDOMId).getStyle('height');
            containerHeight = containerHeight.substr(0, containerHeight.length-2);
            return (_cfg.bBox[2] - latitude)*containerHeight/(_cfg.bBox[2]-_cfg.bBox[3]);
        },

        _localToLongitude = function (x) {
            var containerWidth = Y.one(_cfg.mapDOMId).getStyle('width');
            containerWidth = containerWidth.substr(0, containerWidth.length-2);
            return _cfg.bBox[0]+x*(_cfg.bBox[1]-_cfg.bBox[0])/containerWidth;
        },

        _localToLatitude = function (y) {
            var containerHeight = Y.one(_cfg.mapDOMId).getStyle('height');
            containerHeight = containerHeight.substr(0, containerHeight.length-2);
            return _cfg.bBox[2]-y*(_cfg.bBox[2]-_cfg.bBox[3])/containerHeight;
        },

        _handleMapClick = function (e) {
            var container = Y.one(_cfg.containerDOMId);
            var pointer = Y.one(_cfg.pointerDOMId);
            var currentX = e.pageX - container.getX();
            var currentY = e.pageY - container.getY();

            pointer.setStyle('left', currentX);
            pointer.setStyle('top', currentY);

            Y.fire('ln-map:onLocationSelected', {
                long: _localToLongitude(currentX),
                lat: _localToLatitude(currentY)
            });
        }

        return {

            init: function (cfg) {
                _cfg = cfg;
                Y.one(_cfg.containerDOMId).on('click', _handleMapClick)
                this.toggleMap();
                // TODO: init drag'n'drop for pointer
            },

            setCoords: function (longitude, latitude) {
                var pointer = Y.one(_cfg.pointerDOMId);
                pointer.setStyle('left', _longitudeToLocal(longitude));
                pointer.setStyle('top', _latitudeToLocal(latitude));
            },

            setRegion: function (regionIndex) {
                var map_overlay = Y.one(_cfg.mapOverlayDOMId);
                var imgHeight = Y.one(_cfg.mapDOMId).getStyle('height');
                imgHeight = imgHeight.substr(0, imgHeight.length-2)
                map_overlay.setStyle('margin-top', -imgHeight*regionIndex);
                map_overlay.setStyle('display', 'block');
            },

            toggleMap: function () {
                var newHeight,
                    newOpacity,
                    newContent,
                    delay;

                if (expanded) {
                    newHeight = '0';
                    newOpacity = 0;
                    newContent = 'Show Map';
                    delay = 0;
                    expanded = false;
                } else {
                    newHeight = Y.one(_cfg.mapDOMId).getStyle('height');
                    newOpacity = 1;
                    newContent = 'Hide Map';
                    delay = 0.3;
                    expanded = true;
                }

                // animation
                Y.one(_cfg.containerDOMId).transition({
                    easing: 'ease-out',
                    duration: 0.6,
                    height: newHeight,
                }, function() {
                    Y.one('#showMap').setContent(newContent);
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
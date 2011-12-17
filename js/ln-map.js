/*global window, navigator, YUI */
YUI.add('ln-map', function(Y) {
    "use strict";
    Y.namespace('ln');

    Y.ln.map = function() {

        var _cfg,
            _expanded = false,

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
            var container = Y.one(_cfg.containerDOMId),
                pointer = Y.one(_cfg.pointerDOMId),
                currentX = e.pageX - container.getX(),
                currentY = e.pageY - container.getY();

            pointer.setStyle('left', currentX);
            pointer.setStyle('top', currentY);

            _dispatchLocationSelected(_localToLongitude(currentX), _localToLatitude(currentY));
        },

        _dispatchLocationSelected = function (long, lat) {
            Y.fire('ln-map:onLocationSelected', {
                long: long,
                lat: lat
            });
        }

        return {

            init: function (cfg) {
                _cfg = cfg;
                Y.one(_cfg.containerDOMId).on('click', _handleMapClick)
            },

            setCoords: function (longitude, latitude) {
                var pointer = Y.one(_cfg.pointerDOMId);
                pointer.setStyle('left', _longitudeToLocal(longitude));
                pointer.setStyle('top', _latitudeToLocal(latitude));
                _dispatchLocationSelected(longitude, latitude);
            },

            setRegion: function (regionIndex) {
                var map_overlay = Y.one(_cfg.mapOverlayDOMId),
                    imgHeight = Y.one(_cfg.mapDOMId).getStyle('height');
                imgHeight = parseInt(imgHeight.substr(0, imgHeight.length-2), 10);
                imgHeight = (imgHeight > 381) ? imgHeight + 0.5 : imgHeight;// hack, to make calculation on big screens accurate
                map_overlay.setStyle('display', 'block');

                map_overlay.setStyle('opacity', 0);
                map_overlay.setStyle('margin-top', (-imgHeight)*regionIndex);

                map_overlay.transition({
                    easing: 'ease-out',
                    duration: 0.6,
                    opacity: 1
                });
            },

            toggleMap: function () {
                var newHeight,
                    newOpacity,
                    newContent,
                    delay;

                if (_expanded) {
                    newHeight = '0';
                    newOpacity = 0;
                    newContent = 'Karte anzeigen';
                    delay = 0;
                    _expanded = false;
                } else {
                    newHeight = Y.one(_cfg.mapDOMId).getStyle('height');
                    newOpacity = 1;
                    newContent = 'Karte verstecken';
                    delay = 0.3;
                    _expanded = true;
                }

                // animation
                Y.one(_cfg.containerDOMId).transition({
                    easing: 'ease-out',
                    duration: 0.6,
                    height: newHeight
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

/*global window, navigator, YUI */
YUI({
    modules: {
       'ln-geolocation': {
           fullpath: "js/ln-geolocation.js"
       },
       'ln-map': {
           fullpath: "js/ln-map.js"
       },
       'ln-articlemanager': {
           fullpath: "js/ln-articlemanager.js"
       }
    }
}).use('node', 'event-custom', 'json-parse', 'json-stringify', 'io-base', 'transition', 'ln-geolocation', 'ln-articlemanager', 'ln-map', function(Y) {
    "use strict";

    var _handleAjaxResponse = function (id, response) {
        var data = Y.JSON.parse(response.responseText);

        _replaceSubTitle(data.title, data.title_addition);
        Y.ln.map.setRegion(data.index);
        Y.ln.articlemanager.replaceArticles(data.articles);
    },

    _replaceSubTitle = function (location, addition) {
        var subtitle = Y.one('#subtitle'),
            currentLocation = Y.one('#location').get('innerHTML');

        if (currentLocation != location && !(currentLocation == '...' && Y.Lang.isUndefined(location))) {
            subtitle.setStyle('opacity', 0);

            if (!Y.Lang.isUndefined(location)) {
                Y.one('#location').set('innerHTML', location);
                Y.one('#location_addition').set('innerHTML', addition);
            } else {
                Y.one('#location').set('innerHTML', '...');
                Y.one('#location_addition').set('innerHTML', '');
            }

            subtitle.transition({
                easing: 'ease-out',
                duration: 0.6,
                opacity: 1
            });
        }

    };

    // map
    Y.ln.map.init({
        containerDOMId: '#map_container',
        mapDOMId: '#map',
        mapOverlayDOMId: '#map_overlay',
        pointerDOMId: '#pointer',
        bBox: [
            5.5677618256138981,
            10.906968788623303,
            47.939699177829326,
            45.616612008057189
        ]
    });

    Y.one('#showMap').on('click', Y.ln.map.toggleMap);

    // geolocation
    Y.ln.geolocation.askForCoords();

    Y.on('ln-geolocation:onNoCoords', function (e) {
        Y.ln.map.setCoords(8.559942394467086, 47.46858359794547);
    });

    Y.on('ln-geolocation:onReceivedCoords', function (e) {
        Y.ln.map.setCoords(e.long, e.lat);
    });

    Y.on('ln-map:onLocationSelected', function (e) {
        var point = {
            'x': e.long,
            'y': e.lat
        }

        Y.io('data.php', {
            method: 'POST',
            data: 'point=' + Y.JSON.stringify(point)
        });
    });

    // ajax
    Y.on('io:complete', _handleAjaxResponse, Y);

});

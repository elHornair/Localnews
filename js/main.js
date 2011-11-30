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
}).use('node', 'event-custom', 'json-parse', 'json-stringify', 'io-base', 'transition', 'gallery-accordion', 'ln-geolocation', 'ln-articlemanager', 'ln-map', function(Y) {
    // TODO: get gallery-accordion as git submodule

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
        Y.log('no coords');
        // TODO: show default location
    });

    Y.on('ln-geolocation:onReceivedCoords', function (e) {
        Y.ln.map.setCoords(e.long, e.lat);
    });

    //var points = [];

    Y.on('ln-map:onLocationSelected', function (e) {
        var point = {
            'x': e.long,
            'y': e.lat
        }

        Y.io('data.php', {
            method: 'POST',
            data: 'point=' + Y.JSON.stringify(point)
        });

        //points.push(point);
        //Y.log(Y.JSON.stringify(points));
    });

    // TODO: place pointer somewhere that makes sense

    // articlemanager
    Y.ln.articlemanager.init();

    // ajax
    Y.on('io:complete', complete, Y);// TODO: don't listen to that globally

    function complete(id, response) {
        var data = Y.JSON.parse(response.responseText);
        Y.ln.map.setRegion(data.index);
        Y.ln.articlemanager.replaceArticles(data.articles);
    };

});

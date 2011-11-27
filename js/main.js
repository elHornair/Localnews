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

    // geolocation
    Y.ln.geolocation.getCoords();

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

    Y.on('io:complete', complete, Y);// TODO: don't listen to that globally

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
    Y.ln.map.setCoords(5.957079, 46.128341);
    Y.ln.map.setRegion(5);

    // articlemanager
    Y.ln.articlemanager.init();
    Y.ln.articlemanager.replaceArticles();

    // ajax
    function complete(id, response) {
        var data = Y.JSON.parse(response.responseText);
        Y.ln.map.setRegion(data.index);
        //Y.log(data);
    };

});

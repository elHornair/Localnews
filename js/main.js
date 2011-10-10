YUI({
    modules: {
       'ln-geolocation': {
           fullpath: "js/ln-geolocation.js"
       },
       'ln-map': {
           fullpath: "js/ln-map.js"
       }/*,
       'ln-articlemanager': {
           fullpath: "js/ln-articlemanager.js"
       }*/
    }
}).use('io-base', 'transition', /*'gallery-accordion', */'ln-geolocation', 'ln-articlemanager', 'ln-map', function(Y) {
    // TODO: get gallery-accordion as git submodule

    // geolocation
    Y.ln.geolocation.getCoords();

    // map
    Y.ln.map.init({
        mapDOMId: '#map',
        pointerDOMId: '#pointer',
        bBox: [
            100,
            200,
            100,
            1000,
        ]
    });

    Y.ln.map.setCoords(150, 700);

    // articlemanager
    //Y.ln.articlemanager.init();
    //Y.ln.articlemanager.replaceArticles();

    // ajax
    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);complete
    };

    Y.on('io:complete', complete, Y);// TODO: don't listen to that globally
    Y.io("data.php");

});

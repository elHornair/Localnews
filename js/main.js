YUI({
    modules: {
       'ln-geolocation': {
           fullpath: "js/ln-geolocation.js"
       },
       'ln-articlemanager': {
           fullpath: "js/ln-articlemanager.js"
       }
    }
}).use('io-base', 'transition', 'gallery-accordion', 'ln-geolocation', 'ln-articlemanager', function(Y) {

    // geolocation
    Y.ln.geolocation.getCoords();

    // articlemanager
    Y.ln.articlemanager.init();

    // ajax
    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);complete
    };

    Y.on('io:complete', complete, Y);// TODO: don't listen to that globally
    Y.io("data.php");

    // animation
    Y.one('#pointer').transition({
        easing: 'ease-out',
        duration: 0.75,
        top: '200px',
        left: '300px'
    }, function() {
        //Y.log("feddig anim: "+this);
    });

});

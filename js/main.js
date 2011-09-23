YUI({
    modules: {
       'ln-geolocation': {
           fullpath: "js/ln-geolocation.js"
       }
    }
}).use('io-base', 'transition', 'ln-geolocation', function(Y) {

    // geolocation
    Y.ln.geolocation.getCoords();

    // ajax
    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);complete
    };

    Y.on('io:complete', complete, Y);
    Y.io("data.php");

    // animation
    Y.one('#pointer').transition({
        easing: 'ease-out',
        duration: 0.75,
        top: '200px',
        left: '300px'
    }, function() {
        Y.log("feddig: "+this);
    });

});

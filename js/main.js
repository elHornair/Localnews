YUI({
    modules: {
       'ln-geolocation': {
           fullpath: "js/ln-geolocation.js"
       }
    }
}).use('io-base', 'ln-geolocation', function(Y) {

    Y.ln.geolocation.getCoords();

    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);complete
    };

    Y.on('io:complete', complete, Y);
    Y.io("data.php");

});

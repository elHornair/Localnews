YUI().use("io-base", function(Y) {
    var uri = "data.php";

    function complete(id, response) {
        var data = response.responseText;
        Y.log(data);
    };

    Y.on('io:complete', complete, Y);
    var request = Y.io(uri);

});
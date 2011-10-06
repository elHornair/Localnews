YUI.add('ln-map', function(Y) {

    Y.namespace('ln');

    Y.ln.map = function() {

        // TODO: check how I can save cfg
        var cfg = "zulu";

        return {
            init: function(cfg) {
                Y.log("map cfg: "+cfg);
                // animation
                Y.one('#pointer').transition({
                    easing: 'ease-out',
                    duration: 0.75,
                    top: '200px',
                    left: '300px'
                }, function() {
                    //Y.log("feddig anim: "+this);
                });
            }
        }

    }();
}, '0.0.1', { requires: ['transition'] });
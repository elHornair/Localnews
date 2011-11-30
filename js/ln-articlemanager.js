YUI.add('ln-articlemanager', function(Y) {

    Y.namespace('ln');

    Y.ln.articlemanager = function() {
        var i,
            accordion,
            item;

        accordion = new Y.Accordion({
            srcNode: '#articleAccordion',
            useAnimation: true,
            collapseOthersOnExpand: true
        });
        accordion.render();

        return {

            init: function() {
                Y.log("init articlemanager");
            },

            replaceArticles: function(articles) {

                // remove old articles
                Y.one('#articleAccordion').set( 'innerHTML', '');

                // add new articles
                for (i=0; i<articles.length; i++) {

                    item = new Y.AccordionItem( {
                        label: articles[i].title,
                        id: 'dynamicItem'+i,
                        contentHeight: {
                            method: "auto"
                        }
                    });

                    item.set('bodyContent', articles[i].body);
                    accordion.addItem( item );
                }
            }

        }

    }();
}, '0.0.1', { requires: ['gallery-accordion'] });
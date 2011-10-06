YUI.add('ln-articlemanager', function(Y) {

    Y.namespace('ln');

    Y.ln.articlemanager = function() {
        var accordion,
            items = [];

        accordion = new Y.Accordion({
            srcNode: "#acc1",
            useAnimation: true,
            collapseOthersOnExpand: true
        });

        items['item1'] = new Y.AccordionItem( {
            label: "Item1",
            expanded: true,
            id: "dynamicItem1",
            contentHeight: {
                method: "stretch"
            },
            closable: true
        } );

        items['item1'].set( "bodyContent", "This is the body of the item, added dynamically to accordion.<br>Content height has been set as \"fixed, 80px\"." );

        accordion.addItem( items['item1'] );

        items['item2'] = new Y.AccordionItem( {
            label: "Item2",
            expanded: false,
            id: "dynamicItem2",
            contentHeight: {
                method: "stretch"
            }
        } );

        items['item2'].set( "bodyContent", "This is the body of the item, added dynamically to accordion, before item1.<br>Content height has been set as \"stretch\"." );

        accordion.addItem( items['item2'] );

        accordion.render();

        return {
            init: function() {
                Y.log("init articlemanager");
            },
            replaceArticles: function() {
                Y.log("replace articles now");
            }
        }

    }();
}, '0.0.1', { requires: ['gallery-accordion'] });
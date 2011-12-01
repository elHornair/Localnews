YUI.add('ln-articlemanager', function(Y) {

    Y.namespace('ln');

    Y.ln.articlemanager = function() {

        var currentItem;

        _handleItemClick = function (e) {
            var clickedItem;

            e.preventDefault();
            clickedItem = e.currentTarget.get('id');
            Y.log(clickedItem);
            // TODO: close currentItem
            // TODO: open e.target
            // TODO: on finished: currentItem = e.target
        }

        return {

            init: function() {
                Y.log("init articlemanager");
            },

            replaceArticles: function(articles) {

                // remove old articles
                var container,
                    articleItem,
                    headItem,
                    bodyItem;

                container = Y.one('#articleAccordion');

                container.set( 'innerHTML', '');

                // add new articles
                for (i=0; i<articles.length; i++) {

                    headItem = Y.Node.create('<a id="' + i + '" href="#">' + articles[i].title + '</a>');
                    headItem.on('click', _handleItemClick);
                    articleItem = Y.Node.create('<article></article>');

                    bodyItem = Y.Node.create('<div id="article_body_' + i + '" class="article_body">' + articles[i].body + '</div>');

                    articleItem.append(headItem);
                    articleItem.append(bodyItem);

                    container.append(articleItem);

                }
            }

        }

    }();
}, '0.0.1');
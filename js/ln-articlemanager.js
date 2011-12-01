YUI.add('ln-articlemanager', function(Y) {

    Y.namespace('ln');

    Y.ln.articlemanager = function() {

        var _currentItem;

        _handleItemClick = function (e) {
            var clickedItem;

            e.preventDefault();
            clickedItem = Y.one('#article_body_' + e.currentTarget.get('id'));
            clickedItem.setStyle('height', 'auto');

            if (!Y.Lang.isUndefined(_currentItem)) {
                _currentItem.setStyle('height', 0);
            }
            _currentItem = clickedItem;
            // TODO: do it as an animation
        }

        return {

            replaceArticles: function(articles) {

                // remove old articles
                var container,
                    articleItem,
                    headItem,
                    bodyItem;

                _currentItem = undefined;
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
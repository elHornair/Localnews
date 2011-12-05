YUI.add('ln-articlemanager', function(Y) {

    Y.namespace('ln');

    Y.ln.articlemanager = function() {

        var _itemHeights,
            _currentItem;

        _handleItemClick = function (e) {
            var clickedItem,
                clickedItemId;

            e.preventDefault();
            clickedItemId = e.currentTarget.get('id');
            clickedItem = Y.one('#article_body_' + clickedItemId);

            clickedItem.transition({
                easing: 'ease-out',
                duration: 0.3,
                height: _itemHeights[clickedItemId]
            }, function() {
                _currentItem = clickedItem;
            });

            if (!Y.Lang.isUndefined(_currentItem)) {
                _currentItem.transition({
                    easing: 'ease-out',
                    duration: 0.3,
                    height: 0
                });
            }

            // TODO: make it closeable (dont mess it up, check if its same as already active)
        }

        return {

            replaceArticles: function(articles) {

                // remove old articles
                var container,
                    articleItem,
                    headItem,
                    bodyItem;

                // reset previous values
                _currentItem = undefined;
                _itemHeights = [];
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

                    _itemHeights.push(bodyItem.getStyle('height'));
                    bodyItem.setStyle('height', 0);

                }
            }

        }

    }();
}, '0.0.1');
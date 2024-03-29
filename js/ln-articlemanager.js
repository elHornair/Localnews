/*global window, navigator, YUI */
YUI.add('ln-articlemanager', function(Y) {
    "use strict";
    Y.namespace('ln');

    Y.ln.articlemanager = function() {

        var _itemHeights,
            _currentItem,
            _transitionTime = 0.3,

        _handleItemClick = function (e) {
            var clickedItem,
                clickedItemId;

            e.preventDefault();
            clickedItemId = e.currentTarget.get('id');
            clickedItem = Y.one('#article_body_' + clickedItemId);

            if (clickedItem !== _currentItem) {
                clickedItem.transition({
                    easing: 'ease-out',
                    duration: _transitionTime,
                    height: _itemHeights[clickedItemId]
                }, function() {
                    _currentItem = clickedItem;
                });

                if (!Y.Lang.isUndefined(_currentItem)) {
                    _currentItem.transition({
                        easing: 'ease-out',
                        duration: _transitionTime,
                        height: 0
                    });
                }
            } else {
                _currentItem.transition({
                    easing: 'ease-out',
                    duration: _transitionTime,
                    height: 0
                }, function() {
                    _currentItem = undefined;
                });
            }

        };

        return {

            replaceArticles: function(articles) {
                // remove old articles
                var container,
                    articleItem,
                    headItem,
                    bodyItem,
                    i;

                // reset previous values
                _currentItem = undefined;
                _itemHeights = [];
                container = Y.one('#articleAccordion');
                container.set( 'innerHTML', '');
                container.setStyle( 'opacity', 0);

                if (!Y.Lang.isUndefined(articles)) {
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
                } else {
                    // show error message
                    articleItem = Y.Node.create('<div class="error">Für diese Position können keine News zur Verfügung gestellt werden. Bitte wähle über die Karte eine andere Region aus.</div>');
                    container.append(articleItem);
                }

                container.transition({
                    easing: 'ease-out',
                    duration: 0.6,
                    opacity: 1
                });
            }

        }

    }();
}, '0.0.1');
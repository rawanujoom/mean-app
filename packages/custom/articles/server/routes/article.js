(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Article, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/article/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/article/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/article/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/article/example/render', function(req, res) {
            Article.render('index', {
                package: 'article'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
        
        var articles = require('../controllers/article')(Article);
        
        app.route('/api/article/create')
            .post(articles.create);
        
        app.get('/api/article', function(req, res) {
            return articles.list(req, res);
        });

        app.route('/api/article/:articleId')
            .get(articles.load);
        //app.param('articleId', articles.article);
    };
})();

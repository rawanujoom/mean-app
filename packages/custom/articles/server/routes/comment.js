(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Comment, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/comment/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/comment/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/comment/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/comment/example/render', function(req, res) {
            Comment.render('index', {
                package: 'comment'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
        var comment = require('../controllers/comment')(Comment);
        
        // app.post('/api/comment/create', function(req, res) {
        //     return comment.create(req, res);
        // });
        app.route('/api/comment/create/:articleId')
            .post(comment.create);
        
        app.get('/api/comments/:articleId', function(req, res) {
            return comment.list(req, res);
        });
    };
})();

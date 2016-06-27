(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Ravan, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');

        app.get('/api/ravan/example/anyone', function(req, res) {
            res.send('Anyone can access this');
        });

        app.get('/api/ravan/example/auth', requiresLogin, function(req, res) {
            res.send('Only authenticated users can access this');
        });

        app.get('/api/ravan/example/admin', requiresAdmin, function(req, res) {
            res.send('Only users with Admin role can access this');
        });

        app.get('/api/ravan/example/render', function(req, res) {
            Ravan.render('index', {
                package: 'ravan'
            }, function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });
        });
        var ravooneh = require('../controllers/ravooneh')(Ravan);
        
        // app.post('/api/ravooneh/create', function(req, res) {
        //     return ravooneh.create(req, res);
        // });
        app.route('/api/ravooneh/create')
            .post(ravooneh.create);
        
        app.get('/api/ravooneh', function(req, res) {
            return ravooneh.list(req, res);
        });
    };
})();

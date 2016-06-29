'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Article = new Module('article');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Article.register(function(app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  Article.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Article.menus.add({
    title: 'Articles',
    link: 'article page',
    roles: [ 'authenticated', 'anonymous' ],
    menu: 'main'
  });
  
  /**
    //Unarticle to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Article.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Article.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Article.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Article;
});

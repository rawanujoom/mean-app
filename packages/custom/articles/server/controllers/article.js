'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Artcl = mongoose.model('Article'),
  User = mongoose.model('User'),
  config = require('meanio').loadConfig(),
  _ = require('lodash'),
  Promise = require('es6-promise').Promise;


module.exports = function(Article) {
    return {
    	create: function(req, res) { 	
    		var article = new Artcl(req.body);
            if (req.user) {
                article.user_id = req.user._id;
            }
    		article.save(function(err){
    			if(err) {
    				return res.status(500).json(err);
    			}
    			return res.status(200).json(article.toJSON());
    		});

    	},
        list: function(req, res) {
            var list = [];
            Artcl.find().sort('-date').exec(function(err, data) {
                if(err) {
                    res.status(500).send("e5s");
                }
                Promise.all(data.map(function(article) {
                    return new Promise(function(resolve, reject){
                        User.findOne({
                            _id: article.user_id
                        }).exec(function(err, user) {
                            article = article.preview();
                            if (user) {
                                article.name = user.name;
                            }
                            resolve(article);
                        });

                    });
                })).then(function(result) {
                    return res.status(200).json(result  );
                });
               
                
            });
            
        },
        load: function(req, res) {
            Artcl.findOne({_id: req.params.articleId}).exec(function(err, article) {
                if(err) {
                    return res.status(500).send("e5s");
                }
                User.findOne({
                    _id: article.user_id
                }).exec(function(err, user) {
                    article = article.toJSON();
                    if (user) {
                        article.name = user.name;
                    }
                    return res.status(200).json(article);
                });

            }); 
        }

    }
}
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  User = mongoose.model('User'),
  config = require('meanio').loadConfig(),
  _ = require('lodash'),
  Promise = require('es6-promise').Promise;


module.exports = function(Comment) {
    return {
    	create: function(req, res) { 	
    		var comment = req.body;
            if (req.user) {
                comment.user_id = req.user._id;
            }

            Article.findOne({_id : req.params.articleId}).exec(function(err, article) {
                if(err) {
                    res.status(500).send("e5s");
                }
                article.comments.unshift(comment);
        		article.save(function(err){
        			if(err) {
        				return res.status(500).json(err);
        			}
        			return res.status(200).json(comment);
        		});
            });
    
    	},
        list: function(req, res) {
            var list = [];
            Article.findOne({_id : req.params.articleId}).exec(function(err, data) {
                if(err) {
                    res.status(500).send("e5s");
                }
                Promise.all(data.comments.map(function(comment) {
                    return new Promise(function(resolve, reject){
                        User.findOne({
                            _id: comment.user_id
                        }).exec(function(err, user) {
                            comment = comment.toJSON();
                            if (user) {
                                comment.name = user.name;
                            }
                            resolve(comment);
                        });

                    });
                })).then(function(result) {
                    return res.status(200).json(result);
                });
               
                
            });
            
        }

    }
}
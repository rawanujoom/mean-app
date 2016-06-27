'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Ravooneh = mongoose.model('Ravooneh'),
  config = require('meanio').loadConfig(),
  _ = require('lodash');


module.exports = function(Ravan) {
    return {
    	create: function(req, res) {    		
    		var ravooneh = new Ravooneh(req.body);

    		ravooneh.save(function(err){
    			if(err) {
    				return res.status(500).json(err);
    			}
    			return res.status(200).json(ravooneh.toJSON());
    		});

    	},
    	list: function(req, res) {
    		var list = [];
    		Ravooneh.find().exec(function(err, data) {
    			if(err) {
    				res.status(500).send("e5s");
    			}
	    		_.each(data, function(ravooneh){
	    			//console.log(ravooneh);
	    			list.push(ravooneh.toJSON());
	    		});
	    		return res.status(200).json(list);
	    	});
    		
    	}

    }
}
'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
  Schema    = mongoose.Schema,
  _   = require('lodash');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  // If you are authenticating by any of the oauth strategies, don't validate.
  return (this.provider && this.provider !== 'local') || (value && value.length);
};


/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

/**
 * Ravooneh Schema
 */

var RavoonehSchema = new Schema({
  name: {
    type: String,
    get: escapeProperty
  },
  email: {
    type: String,
  },
  comment: {
    type: String, 
    required: true
  }
});


/**
 * Pre-save hook
 */
RavoonehSchema.pre('save', function(next) {
  console.log('savingggggggg');
  next();
});

/**
 * Methods
 */


RavoonehSchema.methods.isRavan = function() {
  return this.name === 'Ravan';
};


/**
 * Hide security sensitive fields
 *
 * @returns {*|Array|Binary|Object}
 */
RavoonehSchema.methods.toJSON = function() {
  var obj = this.toObject();
  obj.isRavan = this.isRavan() ? "Yee ah Ravan" : "ms Ravan :S";  
  return obj;
};

mongoose.model('Ravooneh', RavoonehSchema);

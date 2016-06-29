'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
  Schema    = mongoose.Schema,
  _   = require('lodash');

/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

var formatDate = function(value) {
  return value.toDateString();
};


var CommentSchema = new Schema({
  comment: {
    type: String, 
    required: true,
    get: escapeProperty
  },
  name: {
    type: String,
    get: escapeProperty
  },
  user_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
});


/**
 * Methods
 */

/**
 * Hide security sensitive fields
 *
 * @returns {*|Array|Binary|Object}
 */
CommentSchema.methods.toJSON = function() {
  var obj = this.toObject();
  obj.date = this.date;
  return obj;
};
/**
 * Article Schema
 */

var ArticleSchema = new Schema({
  body: {
    type: String, 
    required: true,
    get: escapeProperty
  },
  title: {
    type: String,
    required: true,
    get: escapeProperty
  },
  user_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  comments: [CommentSchema]
});


/**
 * Hide security sensitive fields
 *
 * @returns {*|Array|Binary|Object}
 */
ArticleSchema.methods.toJSON = function() {
  var obj = this.toObject();
  obj.date = this.date;
  return obj;
};


ArticleSchema.methods.preview = function() {
  return {
    _id: this._id,
    date : this.date,
    title : this.title,
    user_id: this.user_id,
    body: this.body.substring(0,5)
  };
};

mongoose.model('Article', ArticleSchema);

/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
      username : {
      	  type : 'string',
        required : true
      },

      password : { 
      	  type : 'string',
      	  required : true
      },

      utype : {
      	  type : 'string',
      	  required : true
      },

      email : {
      	  type : 'string'
      },

      room_ids : {
        type : 'array'
      }
  },

  beforeCreate : function(values, next) {
    //enctry the password
    console.log('username='+values.username+'  password='+values.password+'utype='+values.utype);
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      });
    });
  }

};

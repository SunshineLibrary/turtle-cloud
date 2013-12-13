/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    username : {
      type : 'string'
    },
    password : {
      type : 'string'
    }
  },

  beforeCreate : function(attrs, next) {
    console.log('username='+attrs.username+'  password='+attrs.password);
    next();
  }
};

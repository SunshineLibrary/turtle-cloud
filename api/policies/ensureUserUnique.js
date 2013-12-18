module.exports = function(req, res, next) {
     console.log('Ensure the registered user is unique');
     next();
 }

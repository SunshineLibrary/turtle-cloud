module.exports = function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    req.session.message = 'You have not login, please login...';
    return res.redirect('/login');
  }
}

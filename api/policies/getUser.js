module.exports = function(req, res, next) {
  if(req.session.user) {
      var user = req.session.user;
      var utype = user.utype;
      if(utype == 'admin') {
          req.session.admin = user;
       } else if(utype == 'teacher') {
          req.session.teacher = user;
      } else if(utype == 'student') {
          req.session.student = user;
      } else if(utype == 'parent') {
          req.session.parent = user;
      }
     next();
  } else {
    req.session.message = '你还没有登陆，请登录...';
    return res.redirect('/login');
  }
}

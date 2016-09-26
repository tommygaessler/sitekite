function loginRedirect(req, res, next) {
  if (req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}

function authRequired(req, res, next) {
  if (!req.user) {
    res.redirect('/auth');
  } else {
    return next();
  }
}

module.exports = {
  loginRedirect,
  authRequired
};

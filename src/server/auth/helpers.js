function loginRedirect(req, res, next) {
  if (req.user) {
    return res.redirect('/auth/members');
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

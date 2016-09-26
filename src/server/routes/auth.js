const express = require('express');
const router = express.Router();
const {get, addUser, checkForms, userInDb, checkNewUser} = require('../queries/index');
const passportGithub = require('../auth/github');
const authHelpers = require('../auth/helpers');

router.get('/', (req, res, next) => {
  res.render('github');
});

<<<<<<< HEAD
=======
router.get('/members',
  authHelpers.authRequired,
  (req, res, next) => {
    res.render('admin_home_page')
  // res.json('This be the members portal');
});

>>>>>>> 399ae6ec8c86f3ad7d407ebcf727e05c3edb216a
router.get('/logout',
  authHelpers.loginRedirect,
  (req, res, next) => {
  req.logout();
  res.redirect('/auth');
});

router.get('/github',
  authHelpers.loginRedirect,
  passportGithub.authenticate('github', {
    scope: ['user:email']
  })
);

router.get('/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/' }), (req, res, next) => {
    // Successful authentication
    userInDb(req.user)
    .then(checkNewUser)
    .then((data) => data ? res.redirect(`/${data[0].username}`) : res.render('new_user_form', req.user))
  });

module.exports = router;

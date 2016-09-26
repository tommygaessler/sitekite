const express = require('express');
const router = express.Router();
const {get, addUser, checkForms, userInDb, checkNewUser} = require('../queries/index');
const passportGithub = require('../auth/github');
const authHelpers = require('../auth/helpers');

router.get('/', (req, res, next) => {
  res.render('github');
});

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
<<<<<<< HEAD
    .then((data) => data ? res.redirect(`/${data[0].username}/dashboard`) : res.render('new_user_form', req.user));
=======
    .then((data) => res.redirect(`/${data[0].username}/dashboard`))
>>>>>>> fa3fa84ccba8b8b6dc2137c194d27df7cea8d07f
  });

module.exports = router;

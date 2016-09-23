const express = require('express');
const router = express.Router();

const passportGithub = require('../auth/github');
const authHelpers = require('../auth/helpers');

router.get('/', (req, res, next) => {
  res.render('github');
});

router.get('/members',
  authHelpers.authRequired,
  (req, res, next) => {
  res.json('This be the members portal');
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
    res.redirect('/auth/members');
  });

module.exports = router;

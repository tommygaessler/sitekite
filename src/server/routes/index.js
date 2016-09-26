const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passportGithub = require('../auth/github');
const {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser} = require('../queries/index');

const indexController = require('../controllers/index');
const ghPinnedRepos = require('gh-pinned-repos');

router.get('/', function (req, res, next) {
  res.render('index', {title: 'SiteKite | Make a Portfolio'});
});

router.get('/:username', function (req, res, next) {
  userInDb(req.params)
  .then((data) => data ? res.render('admin_home_page.html', data[0]) : res.send(data))
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:username/projects', function (req, res, next) {
  userInDb(req.params)
  .then(getProjects)
  .then((data) => data ? res.render('admin_projects_page.html', data[0]) : res.send('Error'));
});

router.get('/:userName/contact', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => {
    const renderObject = user[0];
    res.render('admin_contact_page.html', renderObject);
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:userName/dashboard', passportGithub.authenticate('github', { failureRedirect: '/' }), function (req, res, next) {
  var user1 = req.params.userName
  var user2 = req.user.username
  compareUser(user1, user2) ? res.render('dashboard', {title: 'dashboard'}) : res.render('error');
});

router.post('/new', function (req, res, next) {
  if (!checkForms(req.body)) {
    res.send('fill in all the feilds');
  }
  addUser(req.body)
  .then(() => res.redirect(`/${req.body.username}`));
});

module.exports = router;

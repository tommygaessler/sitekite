const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passportGithub = require('../auth/github');
const {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser, projectsApiCalls, getGithubInfo} = require('../queries/index');
const authHelpers = require('../auth/helpers');
const ghPinnedRepos = require('gh-pinned-repos');

router.get('/', function (req, res, next) {
  var username = false;
  if (req.user) {
    username = req.user.username;
  }
  res.render('index', {title: 'SiteKite | Make a Portfolio', username});
});

router.get('/:username', function (req, res, next) {
  userInDb(req.params)
  .then((data) => data.length ? res.status(202).render('home.html', data[0]) :  res.status(404).render('error', {message: 'No User Found', status: 404}))
  .catch((error) => console.log(error));
});

router.get('/:username/projects', function (req, res, next) {
  userInDb(req.params)
  .then(getProjects)
  .then((data) => data ? res.status(202).render('projects.html', data[0]) : res.status(404).render('error'))
  .catch((error) => console.log(error));
});

router.get('/:userName/contact', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => res.render('contact.html', user[0]))
  .catch((error) => console.log(error));
});

router.get('/:userName/dashboard', authHelpers.authRequired, function (req, res, next) {
  var user1 = req.params.userName
  var user2 = req.user.username
  ghPinnedRepos(req.params.userName)
  .then(projectsApiCalls)
  .then((data) => {
    compareUser(user1, user2) ? res.render('dashboard', {pinnedProjects: data, user: req.user}) : res.render('error');
  })
  .catch((err) => console.log(err));
});

router.post('/new', function (req, res, next) {
  if (!checkForms(req.body)) {
    res.send('fill in all the fields');
  } else {
    addUser(req.body)
    .then(() => res.redirect(`/${req.body.username}`));
  }
});

router.delete('/:id', function (req, res, next) {
  removeUser(req.params.id)
  .then(data => {
    res.redirect('/');
  });
})

module.exports = router;

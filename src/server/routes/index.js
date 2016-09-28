const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passportGithub = require('../auth/github');
const {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser, removeUser, projectsApiCalls, getGithubInfo, loggedInUser, addProjects, updatePro, addNewPro, removePro} = require('../queries/index');
const authHelpers = require('../auth/helpers');
const ghPinnedRepos = require('gh-pinned-repos');

router.get('/', function (req, res, next) {
  var loggedInUser = false;
  if (req.user) {
    loggedInUser = req.user
  }
  res.render('index', {title: 'SiteKite | Welcome!', loggedInUser});
});

router.get('/:username', function (req, res, next) {
  userInDb(req.params)
  .then((data) => {return loggedInUser(req, data)})
  .then((data) => data.length ? res.status(202).render(`themes/${data[0].theme_name}/home`, data[0]) :  res.status(404).render('error', {message: 'No User Found', status: 404}))
  .catch((error) => console.log(error));
});

router.get('/:username/projects', function (req, res, next) {
  userInDb(req.params)
  .then(getProjects)
  .then((data) => {return loggedInUser(req, data)})
  .then((data) => data ? res.status(202).render(`themes/${data[0].theme_name}/projects`, data[0]) : res.status(404).render('error'))
  .catch((error) => console.log(error));
});

router.get('/:userName/contact', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((data) => {return loggedInUser(req, data)})
  .then((user) => res.status(202).render(`themes/${user[0].theme_name}/contact`, user[0]))
  .catch((error) => console.log(error));
});

router.get('/:userName/dashboard', authHelpers.authRequired, function (req, res, next) {
  var user1 = req.params.userName
  var user2 = req.user.username
  getProjects([req.user])
  .then((data) => {
    compareUser(user1, user2) ? res.render('dashboard', {loggedInUser: req.user, username: req.user.username, pinnedProjects: data[0].projects}) : res.render('error');
  })
  .catch((err) => res.send(err));
});

router.post('/new', function (req, res, next) {
  console.log(req.body);
  if (!checkForms(req.body)) {
    res.send('fill in all the fields');
  } else {
    addUser(req.body)
    .then(() => res.redirect(`/${req.body.username}`));
  }
});

router.post('/editPro', authHelpers.authRequired, function (req, res, next) {
  updatePro(req.body)
  .then(() => res.redirect(`/${req.user.username}/dashboard`))
})

router.post('/newPro', authHelpers.authRequired, function (req, res, next) {
  addNewPro(req.body)
  .then(() => res.redirect(`/${req.user.username}/dashboard`))
})

router.post('/importing', authHelpers.authRequired, function (req, res, next) {
  get('projects')
  .where('user_username', req.body.username)
  .del()
  .then(() => {return ghPinnedRepos(req.body.username)})
  .then(projectsApiCalls)
  .then((data) => {
    return addProjects(data, req.user)
  })
  .then((data) => {
    res.redirect(`/${req.user.username}/dashboard/#projects`)
  })
})

router.delete('/:username', authHelpers.authRequired, function (req, res, next) {
  var user1 = req.params.userName
  var user2 = req.user.username
  req.logout()
  removeUser(req.params.username)
  .then(() => compareUser(user1, user2) ? res.send('winning') : res.render('error', {message: 'You aren\'t authorized '}))
})

router.delete('/project/:projectName', authHelpers.authRequired, function (req, res, next) {
  removePro(req.params.projectName)
  .then(() =>res.send('test'))
})

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passportGithub = require('../auth/github');
const {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser} = require('../queries/index');
const authHelpers = require('../auth/helpers');
const ghPinnedRepos = require('gh-pinned-repos');

router.get('/', function (req, res, next) {
  res.render('index', {title: 'SiteKite | Make a Portfolio'});
});

router.get('/:username', function (req, res, next) {
  userInDb(req.params)
  .then((data) => data.length ? res.status(202).render('admin_home_page.html', data[0]) : res.status(404).render('error', {message: 'No User Found', status: 404}))
  .catch((error) => console.log(error));
});

router.get('/:username/projects', function (req, res, next) {
  userInDb(req.params)
  .then(getProjects)
  .then((data) => data ? res.render('admin_projects_page.html', data[0]) : res.send('Error'))
  .catch((error) => console.log(error));
});

router.get('/:userName/contact', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => res.render('contact.html', user[0]))
  .catch((error) => console.log(error));
});

router.get('/:userName/dashboard', authHelpers.authRequired, function (req, res, next) {
  ghPinnedRepos(req.params.userName)
  .then((pinnedProjects) => {
    var user1 = req.params.userName;
    var user2 = req.user.username;
    if (compareUser(user1, user2)) {
      res.status(202).render('dashboard', {pinnedProjects});
    } else {
      res.status(404).render('error');
    }
  })
  .catch((err) => console.log(err));
});

router.post('/new', function (req, res, next) {
  if (!checkForms(req.body)) {
    res.send('fill in all the feilds');
  }
  addUser(req.body)
  .then(() => res.redirect(`/${req.body.username}`));
});

router.delete('/:id', function (req, res, next) {
  removeUser(req.params.id)
  .then(data => {
    res.redirect('/');
  });
})



module.exports = router;

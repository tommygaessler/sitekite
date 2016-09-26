const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {get, addUser, checkForms} = require('../queries/index');

const indexController = require('../controllers/index');
const ghPinnedRepos = require('gh-pinned-repos')

router.get('/', function (req, res, next) {
  res.render('index', {title: 'SiteKite | Make a Portfolio'});
});

router.get('/:userName', function (req, res, next) {
  const username = req.params.userName;
  ghPinnedRepos(username)
    .then(console.log);
  console.log(username);
  knex('users').where('username', username)
  .then((user) => {
    if (user.length > 0) {
      const renderObject = user[0];
      res.render('admin_home_page.html', renderObject)
    } else {
      res.send(user)
    }
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:userName/projects', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => {
    const renderObject = user[0];
    res.render('admin_projects_page.html', renderObject)
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:userName/contact', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => {
    const renderObject = user[0];
    res.render('admin_contact_page.html', renderObject)
  })
  .catch((error) => {
    console.log(error);
  });
});

router.post('/new', function (req, res, next) {
  if (!checkForms(req.body)) {
    res.send('fill in all the feilds')
  }
  addUser(req.body)
  .then(() => res.redirect(`/${req.body.username}`))
})

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {get, addUser, checkForms, userInDb, checkNewUser, getProjects} = require('../queries/index');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/:username', function (req, res, next) {
  userInDb(req.params)
  .then((data) => data ? res.render('admin_home_page.html', data[0]) : res.send(user))
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:username/projects', function (req, res, next) {
  userInDb(req.params)
  .then(getProjects)
  .then((data) => data ? res.render('admin_projects_page.html', data[0]) : res.send('Error'))
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

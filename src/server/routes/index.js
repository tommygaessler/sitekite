const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {get, addUser, checkForms} = require('../queries/index');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/:userName', function (req, res, next) {
  const username = req.params.userName;
  knex('users').where('username', username)
  .then((user) => {
    const renderObject = user[0];
    console.log(renderObject);
    res.render('admin_home_page.html', renderObject)
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
    console.log(renderObject);
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
    console.log(renderObject);
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
  .then(() => res.send('hello'))
})

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const {get, addUser, checkForms} = require('../queries/index');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  indexController.sum(1, 2, (error, results) => {
    if (error) return next(error);
    if (results) {
      renderObject.sum = results;
      res.render('index', renderObject);
    }
  });
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
  }else {
  addUser(req.body)
  .then(() => res.send('User Added'))
  }
})

module.exports = router;

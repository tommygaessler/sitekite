const express = require('express');
const router = express.Router();
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

});

router.get('/:userName/projects', function (req, res, next) {

});

router.get('/:userName/contact', function (req, res, next) {

});

router.post('/new', function (req, res, next) {
  if (!checkForms(req.body)) {
    res.send('fill in all the feilds')
  }
  addUser(req.body)
  .then(() => res.send('hello'))
})

module.exports = router;

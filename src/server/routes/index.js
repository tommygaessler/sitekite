const express = require('express');
const router = express.Router();

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

})

module.exports = router;

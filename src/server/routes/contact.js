const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

router.post('/:username/contact/send', (req, res, next) => {
  var username = req.params.username;
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email(req.body.from_email);
  var to_email = new helper.Email(req.body.to_email);
  var subject = `New Message From ${req.body.name}`;
  var content = new helper.Content('text/plain', `${req.body.message}`);
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    res.redirect(`/${username}/contact`);
  });
});

module.exports = router;

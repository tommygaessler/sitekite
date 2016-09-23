const knex = require('../db/knex');
module.exports = {get, addUser, checkForms}

function get(table) {
  return knex(table)
}

function addUser(body) {
  // get('users').update({})
}

function checkForms(body) {
  var ok = true;
  for (key in body) {
    if (body[key].length == 0 && key !== 'button') {
      ok = false
    }
  }
  return ok;
}

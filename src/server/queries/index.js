const knex = require('../db/knex');
module.exports = {get, addUser, checkForms}

function get(table) {
  return knex(table)
}

function addUser(body) {
  knex('updated_users').insert({
    username: res.body.username,
    github_token: abcdeft123456,
    name: res.body.name,
    email: res.body.email,
    twitter: res.body.twitter,
    linkedin: res.body.linkedin,
    profile_pic_url: res.body.profile_pic_url,
    background_pic_url: res.body.background_pic_url,
    bio_desc: res.body.bio_desc,
    contact_desc: res.body.contact_desc
  })
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

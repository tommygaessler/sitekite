const knex = require('../db/knex');
module.exports = {get, addUser, checkForms}

function get(table) {
  return knex(table)
}

function addUser(body) {
  return get('users')
  .where('username', body.username)
  .update({
    name: body.name,
    email: body.email,
    profile_pic_url: body.profile_pic_url,
    background_pic_url: body.background_pic_url, twitter: body.twitter_username,
    linkedin: body.linkedin_username,
    bio_desc: body.bio_desc,
    contact_desc: body.contact_desc
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

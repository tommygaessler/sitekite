const knex = require('../db/knex');
module.exports = {get, addUser, checkForms, userInDb, checkNewUser}

function get(table) {
  return knex(table)
}

function addUser(body) {
<<<<<<< HEAD
  return get('users')
  .where('username', body.username)
  .update({
    name: body.name,
    email: body.email,
    profile_pic_url: body.profile_pic_url,
    background_pic_url: body.background_pic_url,
    twitter: body.twitter_username,
    linkedin: body.linkedin_username,
    bio_desc: body.bio_desc,
    contact_desc: body.contact_desc
=======
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
>>>>>>> 399ae6ec8c86f3ad7d407ebcf727e05c3edb216a
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

function userInDb(user) {
  return get('users').where('username', user.username)
  .then((data) => {
    console.log(data);
    if (data.length == 0) {
      return false;
    } else {
      return data
    }
  })
}

function checkNewUser(data) {
  if (!data) {
    return false;
  } else {
    if (data[0].email !== null) {
      return data
    } else {
      return false
    }
  }
}

const knex = require('../db/knex');
module.exports = {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser}

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
    background_pic_url: body.background_pic_url,
    twitter: body.twitter_username,
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

function userInDb(user) {
  return get('users').where('username', user.username)
}

function getProjects(data) {
  if (!data.length) {
    return Promise.resolve(false)
  }
  return get('projects').where('user_id', data[0].id)
  .then((projects) => {
    data[0].projects = projects;
    return data
  })
}

function checkNewUser(data) {
  if (data.length === 0) {
    return false;
  } else {
    if (data[0].email !== null) {
      return data
    } else {
      return false
    }
  }
}

function compareUser(user1, user2) {
  if (user1 == user2) {
    return true;
  }
  return false;
}

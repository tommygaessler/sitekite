const knex = require('../db/knex');
const request = require('request');
var http = require('http');
module.exports = {get, addUser, checkForms, userInDb, checkNewUser, getProjects, compareUser, removeUser, projectsApiCalls, getGithubInfo, loggedInUser, addProjects, updatePro}

function get(table) {
  return knex(table);
}
// test - :COMPLETE: (change name)
function addUser(body) {
  return get('users')
  .where('username', body.username)
  .update({
    name: body.name,
    email: body.email,
    twitter: body.twitter,
    linkedin: body.linkedin,
    bio_desc: body.bio_desc,
    contact_desc: body.contact_desc
  });
}

function removeUser (username) {
  var userPromiseArr = [
    get('users')
    .where('username', username)
    .del(), get('projects').where('user_username', username).del()]
  return Promise.all(userPromiseArr)
}
// test - :COMPLETED:
function checkForms(body) {
  var ok = true;
  if (!body.email || !body.name || !body.bio_desc) {
    ok = false;
  }
  return ok;
}
// test - Waiting for Alex & Austin
function getGithubInfo (username) {
  return new Promise ((resolve, reject) => {
    var options = {
      url: `https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET_KEY}`,
      headers: {'User-Agent': 'request'}
    }
    function response (error, response, body) {
      if (error) {
        console.log('error', error);
      }
      var newBody = JSON.parse(body)
      resolve({data: newBody})
      return newBody;
    }
    request(options, response)
  })
}
// test - waiting for Alex & Austin
function projectsApiCalls(arr) {
  var promise = arr.map(function (project) {
    return new Promise((resolve, reject) => {
      var options = {
        url: 'https://api.github.com/repos/' + project + `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET_KEY}`,
        headers: {
          'User-Agent': 'request'
        }
      }
      function wtf (error, response, body) {
        if (error) {
          console.log('error', error);
        }
        var body = JSON.parse(body)
        resolve({pinnedProjects: project, data: body})
        return body;
      }
      request(options, wtf)
    })
  })
  // console.log(promise);
  return Promise.all(promise)
}
// test - written and passes :complete:
function userInDb(user) {
  return get('users').where('username', user.username);
}
// test -
function getProjects(data) {
  if (!data.length) {
    return Promise.resolve(false);
  }
  return get('projects').where('user_username', data[0].username)
  .then((projects) => {
    data[0].projects = projects;
    return data;
  });
}
// test -
function checkNewUser(data) {
  if (data.length === 0) {
    return false;
  } else {
    if (data[0].email !== null) {
      return data;
    } else {
      return false;
    }
  }
}
// test -
function compareUser(user1, user2) {
  if (user1 === user2) {
    return true;
  }
  return false;
}
// test - ?
function loggedInUser(req, data) {
  if (req.user && data.length > 0) {
    data[0].loggedInUser = req.user
  }
  return Promise.resolve(data)
}

function addProjects(data, user) {
  var promise = data.map(function (project) {
    return get('projects').insert({
      github_url: project.data.html_url,
      project_name: project.data.name,
      deployed_url: project.data.homepage,
      tools_languages: project.data.language,
      user_username: user.username
    }).then()
  })
  return Promise.all(promise).then(() => {
    return user;
  })
}

function updatePro(body) {
  return get('projects')
  .where('user_username', body.username)
  .where('project_name', body.old_projectname)
  .update({
    github_url: body.github_url,
    deployed_url: body.deployed_url,
    description: body.description,
    tools_languages: body.tools_languages
  })
}

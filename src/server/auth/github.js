const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const {getGithubInfo, projectsApiCalls, addProjects} = require('../queries/index');
const init = require('./init');
const knex = require('../db/knex');
const ghPinnedRepos = require('gh-pinned-repos');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET_KEY,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  // var pass = bcrypt.hashSync(accessToken, 9);
  const login = profile._json.login;
  // does the user exist?
  return knex('users').select('*').where({
    username: login
  })
  // .first()
  .then((user) => {
    // yes
    if (user.length) {
      return done(null, user[0]);
    }
    // no
    return knex('users').insert({
      username: login,
      github_token: accessToken
    })
    .returning('*')
    .then((user) => {
      getGithubInfo(user[0].username)
      .then((userData) => {
        knex('users').where('id', user[0].id)
        .update({
          profile_pic_url: userData.data.avatar_url,
          name: userData.data.name,
          email: userData.data.email
        }).then(() => {
          ghPinnedRepos(user[0].username)
          .then(projectsApiCalls)
          .then((data) => {
            return addProjects(data, user[0])
          })
          .then((data) => {
            done(null, data)
          })
        })
      })
    });
  })
  .catch((err) => {
    done(err);
  });
}));

// serialize user into the session
init();

module.exports = passport;

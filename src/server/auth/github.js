const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const init = require('./init');
const knex = require('../db/knex');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_SECRET_KEY,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  const githubAccessToken = accessToken;
  const login = profile._json.login;
  console.log(login);
  // does the user exist?
  return knex('users').select('*').where({
    username: login
  })
  .then((user) => {
    // yes
    if (user.length) {
      done(null, user[0]);
    }
    // no
    return knex('users').insert({
      username: login,
      github_token: githubAccessToken
    })
    .returning('*')
    .then((user) => {
      done(null, user[0]);
    });
  })
  .catch((err) => {
    done(err);
  });
}));

// serialize user into the session
init();

module.exports = passport;

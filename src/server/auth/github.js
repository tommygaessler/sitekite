const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');

const init = require('./init');
const knex = require('../db/knex');

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

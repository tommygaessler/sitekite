process.env.NODE_ENV = 'test';
const knex = require('../../src/server/db/knex');
const helpers = require('../_helpers');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app.js');

const passportStub = require('passport-stub')
passportStub.install(server)

describe('routes : auth', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });
  
  describe('GET /logout', () => {
    it('should log out and redirect to log in page', (done) => {
      return knex('users')
      .then((users) => {
        passportStub.login(users[0])
        chai.request(server)
        .get(`/${users[0].username}/dashboard`)
        .end((err, res) => {
          res.type.should.equal('text/html');
          res.status.should.equal(200);
          chai.request(server)
          .get('/auth/logout')
          .end((err, res) => {
            res.redirects.length.should.equal(1);
            res.status.should.equal(200);
            res.type.should.equal('text/html');
            res.text.should.contain('<h1>Making a Portfolio Sucks</h1>');
            chai.request(server)
            .get(`/${users[0].username}/dashboard`)
            .end((err, res) => {
              res.redirects.length.should.equal(1);
              // res.redirects.should.contain('/auth')
              res.type.should.equal('text/html')
              res.text.should.contain('<i class="fa fa-github" aria-hidden="true"></i> Sign in with Github');
              done();
            });
          });
        });
      })
    });
  });

});

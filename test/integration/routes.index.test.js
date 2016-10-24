process.env.NODE_ENV = 'test';
const knex = require('../../src/server/db/knex');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app.js');

describe('routes : index', () => {

  describe('GET /', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should render the landing page: "index.html" ', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.status.should.equal(200);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Making a Portfolio Sucks</h1>');
        done();
      });
    });
  });

  describe('GET /:username', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should render the home.html if user exists in the Database', (done) => {
      chai.request(server)
      .get('/this_is_a_test')
      .end((err, res) => {
        res.status.should.equal(202);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>About Me</h1>');
        done();
      });
    });
    it('should render the error.html if user does not exists in the Database', (done) => {
      chai.request(server)
      .get('/t')
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Whoops. Something is wonky here.</h1>')
        done()
      })
    })
  });

  describe('GET /:username/projects', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should render the projects.html page if user exists in the Database', (done) => {
      chai.request(server)
      .get('/this_is_a_test/projects')
      .end((err, res) => {
        res.status.should.equal(202);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Projects</h1>')
        done()
      })
    })
    it('should render the error.html page if user exists in the Database', (done) => {
      chai.request(server)
      .get('/t/projects')
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Whoops. Something is wonky here.</h1>')
        done()
      })
    })
  })

  describe('GET /:userName/dashboard', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should not render the main users dashboard.html page', (done) => {
      chai.request(server)
      .get('/this_is_a_test/dashboard')
      .end((err, res) => {
        res.type.should.equal('text/html')
        res.text.should.contain('<h1>Please sign in to continue.</h1>')
        done()
      })
    })
  })

  describe('POST /new', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should render that users dashboard.html page', (done) => {
      chai.request(server)
      .post('/new')
      .end((err, res) => {
        // console.log(res);
        done()
      })
    })
  })

});
// routes.index.test.js

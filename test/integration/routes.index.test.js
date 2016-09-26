process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app.js');

describe('routes : index', () => {

  describe('GET /', () => {
    it('should render the index.html', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(200);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Making a Portfolio Sucks</h1>');
        done();
      });
    });
  });

  describe('GET /:username', () => {
    it('should render home.html', (done) => {
      chai.request(server)
      .get('/1')
      .end((err, res) => {
        res.redirects.length.should.equal(0);
        res.status.should.equal(201);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>About Me</h1>');
        done();
      });
    });
  });

});

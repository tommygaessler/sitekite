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
      .get('/this_is_a_test')
      .end((err, res) => {
        // res.status.should.equal(202);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>About Me</h1>');
        done();
      });
    });
    it('should render error.html', (done) => {
      chai.request(server)
      .get('/t')
      .end((err, res) => {
        // res.status.should.equal(404);
        res.type.should.equal('text/html');
        res.text.should.contain('<h1>Your Error Message:</h1>')
        done()
      })

    })
  });

});

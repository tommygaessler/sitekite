process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const query = require('../../src/server/queries/index.js');

const test_user = {
  username: 'this_is_a_test',
  name: 'example_isaac',
  email: 'example@test.com',
  github_token: 'github_token_test',
  profile_pic_url: 'https://leantesting-wp.s3.amazonaws.com/resources/wp-content/uploads/2015/02/tdd-circle-of-life.png',
  twitter: 'twitter.com/testIsaac',
  linkedin: 'linkedin.com/in/testIsaac',
  bio_desc: 'something about me',
  contact_desc: '1234567890'
}
const bad_test_user = {
  username: 'this_is_a_failed_test',
  name: 'example_isaac',
  email: 'example@test.com',
  twitter: 'twitter.com/testIsaac',
  linkedin: 'linkedin.com/in/testIsaac',
  bio_desc: 'something about me',
  contact_desc: '1234567890'
}

describe('Queries : index.js', () => {
  // need help
  xdescribe('function: get()', () => {
    it('should return the table passed in, if the table exists', (done) => {
      expect(query.get('site_builder_test')).to.deep.equal('congrats!')
    })
  })

  describe('function: addUser()', () => {
    it('should update the user to the user database *if user exists*', (done) => {
      query.addUser(test_user)
      .then((update) => {
        expect(update).to.equal(1)
        done()
      })
    })
    it('should not run if user does not exist', (done) => {
      query.addUser(bad_test_user)
      .then((update) => {
        expect(update).to.equal(0)
        done()
      })
    })
  })
  // waiting for removeUser() to run properly (austin/alex)
  xdescribe('function: removeUser()', () => {
    it('should remove that user from the database *if user exists*', (done) => {
      query.removeUser(test_user)
      .then((del) => {
        expect(del).to.equal(1)
        done()
      })
    })
  })

  xdescribe('function: checkForms()', () => {
    it('should validate that the user has the expected fields filled out properly', (done) => {
      query.checkForms(test_user)
      .then((user) => {
        expect(user).to.equal(1)
        done()
      })
    })
  })

  describe('function: userInDb()', () => {
    it('should validate that the user being pased through has the required keys', () => {
      return query.userInDb(test_user)
      .then((res) => {
        expect(res[0]).to.contain.keys('username', 'github_token', 'name', 'email', 'twitter', 'linkedin', 'profile_pic_url', 'contact_desc')
      })
    })
  })

  xdescribe('function: getProjects()', () => {
    it('should return the projects from the user that is passed in', () => {
      query.getProjects(data)
    })
  })

})

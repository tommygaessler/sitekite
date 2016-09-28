process.env.NODE_ENV = 'test';

const knex = require('../../src/server/db/knex');
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
  twitter: 'twitter.com/testIsaac',
  linkedin: 'linkedin.com/in/testIsaac',
  bio_desc: 'something about me',
  contact_desc: '1234567890'
}

describe('Queries : index.js', () => {
  describe('function: get()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should return the table passed in, if the table exists', () => {
      return query.get('users')
      .then((thing) => {
        expect(thing[0]).to.contain.keys('id','username', 'github_token')
      })
    })
  })

  describe('function: addUser()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
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
  describe('function: removeUser()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should remove that user from the database *if user exists*', () => {
      return query.removeUser(test_user)
      .then((del) => {
        expect(del[0]).to.equal(0)
      })
    })
  })

  describe('function: checkForms()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should validate that the user has the expected fields filled out properly', (done) => {
      expect(query.checkForms(test_user)).to.equal(true)
      expect(query.checkForms(bad_test_user)).to.equal(false)
      done()
    })
  })

  describe('function: userInDb()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should validate that the user being pased through has the required keys', () => {
      return query.userInDb(test_user)
      .then((res) => {
        expect(res[0]).to.contain.keys('username', 'github_token', 'name', 'email', 'twitter', 'linkedin', 'profile_pic_url', 'contact_desc')
      })
    })
  })

  describe('function: getProjects()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should return the projects from the user that is passed in', () => {
      return query.getProjects([test_user])
      .then((res) => {
        expect(res[0].projects.length).to.equal(1)
      })
    })
  })

  describe('function: compareUser()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should return true if the users are the same, false if they are different.', () => {
      expect(query.compareUser(test_user, bad_test_user)).to.equal(false)
      expect(query.compareUser(test_user, test_user)).to.equal(true)
    })
  })

  describe('function: loggedInUser()', () => {
    beforeEach(() => {
      return knex.migrate.rollback()
      .then(() => { return knex.migrate.latest(); })
      .then(() => { return knex.seed.run(); });
    });
    afterEach(() => {
      return knex.migrate.rollback();
    });
    it('should verify that someone is logged in', () => {
      return query.loggedInUser(test_user, bad_test_user)
      .then((results) => {
        expect(results)
      })
    })
  })

})

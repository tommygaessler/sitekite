
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'this_is_a_test',
          github_token: 'github_token_test',
          name: 'test_at_example_name',
          email: 'example@test.com',
          twitter: 'twitter.com/test_Example',
          linkedin: 'linkedin.com/test_example',
          profile_pic_url: 'https://leantesting-wp.s3.amazonaws.com/resources/wp-content/uploads/2015/02/tdd-circle-of-life.png',
          contact_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        })
      ]);
    });
};

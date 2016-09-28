
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('projects').insert({
          github_url: 'example_projects.github.com/url',
          deployed_url: 'example_green_potatoes.com',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
          tools_languages: 'JavaScript, Suby, Swift, Go, Node',
          project_name: 'project_example_name',
          image_url: 'http://morningshow.hot1035radio.com/files/2014/05/a-mc-random-30.jpg',
          user_username: 'this_is_a_test'
        })
      ]);
    });
};

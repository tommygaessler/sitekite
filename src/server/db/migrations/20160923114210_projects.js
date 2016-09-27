exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('github_url');
    table.string('deployed_url');
    table.text('description');
    table.text('tools_languages');
    table.string('project_name');
    table.string('image_url');
    table.string('user_username').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};

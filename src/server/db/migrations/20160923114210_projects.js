exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('github_url');
    table.string('deployed_url');
    table.text('description');
    table.text('tools');
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};

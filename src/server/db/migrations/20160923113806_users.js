exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('github');
    table.string('twitter');
    table.string('linkedin');
    table.string('profile_pic_url');
    table.string('background_pic');
    table.text('bio_desc');
    table.text('contact_desc');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

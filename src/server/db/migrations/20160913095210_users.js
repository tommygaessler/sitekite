exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('github_token').notNullable().unique();
    table.string('name');
    table.string('email');
    table.string('twitter');
    table.string('linkedin');
    table.string('profile_pic_url');
    table.string('theme_name');
    table.text('bio_desc');
    table.text('contact_desc');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};

exports.up = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.string('username').notNullable().unique();
    table.string('github_token').notNullable().unique();
    table.string('name');
    table.string('email');
    table.string('twitter');
    table.string('linkedin');
    table.string('profile_pic_url');
    table.string('background_pic');
    table.text('bio_desc');
    table.text('contact_desc');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.withSchema('users', (table) => {
    table.dropColumn('username');
    table.dropColumn('github_token');
    table.dropColumn('name');
    table.dropColumn('email');
    table.dropColumn('twitter');
    table.dropColumn('linkedin');
    table.dropColumn('profile_pic_url');
    table.dropColumn('background_pic');
    table.dropColumn('bio_desc');
    table.dropColumn('contact_desc');
  });
};

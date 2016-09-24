exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('profile_picture');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('tagline');
    table.string('zip_code').notNullable();
    table.integer('availability').defaultTo(36);
    table.string('gender');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players');
};

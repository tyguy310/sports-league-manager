
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', table => {
    table.increments();
    table.string('date').notNullable();
    table.string('start_time').notNullable();
    table.string('end_time').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.integer('locations_id').notNullable();
    table.foreign('locations_id').references('id').inTable('locations');
    table.integer('sports_id').notNullable();
    table.foreign('sports_id').references('id').inTable('sports');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};

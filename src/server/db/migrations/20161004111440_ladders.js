exports.up = function(knex, Promise) {
  return knex.schema.createTable('ladders', (table) => {
    table.increments();
    table.string('type').notNullable();
    table.integer('sport_id').notNullable();
    table.foreign('sport_id').references('id').inTable('sports');
    table.integer('max_positions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ladders');
};

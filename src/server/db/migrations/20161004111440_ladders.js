exports.up = function(knex, Promise) {
  return knex.schema.createTable('ladders', (table) => {
    table.increments();
    table.string('type').notNullable();
    table.string('table_name').notNullable();
    table.integer('sport_id').references('id').inTable('sports');
    table.integer('max_positions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ladders');
};

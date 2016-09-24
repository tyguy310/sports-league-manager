exports.up = function(knex, Promise) {
  return knex.schema.createTable('sports', (table) => {
    table.increments();
    table.string('type').notNullable();
    table.integer('team_capacity').notNullable();
    table.boolean('own_equipment_required').defaultTo(false);
    table.integer('number_already_registered').notNullable.defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sports');
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments();
    table.string('location_name').notNullable();
    table.string('location_image');
    table.string('location_description');
    table.string('loc_add_line_1').notNullable();
    table.string('loc_add_line_2');
    table.string('loc_add_city').notNullable();
    table.string('loc_add_state').notNullable();
    table.string('loc_add_zip').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
};

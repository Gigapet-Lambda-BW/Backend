exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('password', 255).notNullable();
  });

  await knex.schema.createTable('children', tbl => {
    tbl.increments('id');
    tbl.string('first_name', 128).notNullable();
    tbl.string('last_name', 128).notNullable();
    tbl
      .integer('users_id')

      .references('id')
      .inTable('users');
  });

  await knex.schema.createTable('categories', tbl => {
    tbl.increments('id');
    tbl.string('name', 128).notNullable();
    tbl
      .integer('users_id')

      .references('id')
      .inTable('users');
  });

  await knex.schema.createTable('foods', tbl => {
    tbl.increments('id');
    tbl.string('name', 128).notNullable();
    tbl
      .integer('users_id')

      .references('id')
      .inTable('users');
    tbl
      .integer('categories_id')

      .references('id')
      .inTable('categories');
  });

  await knex.schema.createTable('entries', tbl => {
    tbl.increments('id');
    tbl.date('date');
    tbl
      .integer('foods_id')

      .references('id')
      .inTable('foods');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('entries');
  await knex.schema.dropTableIfExists('foods');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('children');
  await knex.schema.dropTableIfExists('users');
};

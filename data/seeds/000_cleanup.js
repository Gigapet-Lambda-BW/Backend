
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('entries').truncate();
  await knex('foods').truncate();
  await knex('categories').truncate();
  await knex('children').truncate();
  await knex('users').truncate();
};

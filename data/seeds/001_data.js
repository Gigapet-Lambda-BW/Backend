
exports.seed = async function (knex) {
  await knex('users').insert([
    { username: 'harry', password: 'abc123' },
    { username: 'jared', password: 'lambda1' },
    { username: 'cassie', password: 'drpepper' }
  ])

  await knex('children').insert([
    { first_name: 'jake', last_name: 'cupcake', users_id: 1 },
    { first_name: 'harry jr.', last_name: 'cupcake', users_id: 1 },
    { first_name: 'jonathan', last_name: 'mongo', users_id: 2 },
    { first_name: 'katrina', last_name: 'nicole', users_id: 3 }
  ])

  await knex('categories').insert([
    { name: 'vegetables', users_id: 1 },
    { name: 'protein', users_id: 1 },
    { name: 'protein', users_id: 2 },
    { name: 'fruit', users_id: 2 },
    { name: 'whole grain', users_id: 2 },
    { name: 'treats', users_id: 3 }
  ])

  await knex('foods').insert([
    { name: 'broccoli', users_id: 1, categories_id: 1 },
    { name: 'pork chop', users_id: 1, categories_id: 2 },
    { name: 'fuji apple', users_id: 2, categories_id: 4 },
    { name: 'bread', users_id: 1, categories_id: 5 },
    { name: 'sour patch kids', users_id: 3, categories_id: 6 }
  ])

  await knex('entries').insert([
    { date: '2020-02-01', foods_id: 1 },
    { date: '2020-02-01', foods_id: 2 },
    { date: '2020-02-01', foods_id: 3 },
    { date: '2020-02-01', foods_id: 4 },
    { date: '2020-01-31', foods_id: 5 }
  ])
};

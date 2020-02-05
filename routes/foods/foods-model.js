const db = require('../../data/db-config');

module.exports = {
  displayAllFoods,
  displayFoodsByUserId,
  foodById,
  insertFood,
  updateFood,
  deleteFood,
};

function displayAllFoods() {
  return db('foods as f')
    .join('users as u', 'u.id', 'f.users_id')
    .join('categories as c', 'c.id', 'f.categories_id');
}

function displayFoodsByUserId(userId) {
  return db('foods as f')
    .join('users as u', 'u.id', 'f.users_id')
    .join('categories as c', 'c.id', 'f.categories_id')
    .where('u.id', userId)
    .select(
      'u.id as user_id',
      'c.name as category',
      'f.name as food',
      'f.categories_id',
      'u.username'
    );
}

function foodById(id) {
  return db('foods')
    .where({ id })
    .select('name')
    .first();
}

async function insertFood(food) {
  const [id] = await db('foods').insert(food);

  return foodById(id);
}

// !!! alter users_id, cat_id in the route.

async function updateFood(food, id) {
  await db('foods')
    .where({ id })
    .update(food);

  return foodById(id);
}

function deleteFood(id) {
  return db('foods')
    .where({ id })
    .del();
}

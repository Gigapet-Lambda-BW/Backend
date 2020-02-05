const db = require('../../data/db-config');

module.exports = {
  categories,
  findCategories,
  findCategory,
  findCategoryById,
  insertCategory,
  updateCategory,
};

function categories() {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .select(
      'u.id as users_id',
      'u.username',
      'c.users_id',
      'c.name',
      'c.id as category_id'
    );
}

function findCategories(id) {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .where('u.id', id)
    .select(
      'u.id as users_id',
      'u.username',
      'c.users_id',
      'c.name',
      'c.id as category_id'
    );
}

function findCategory(id) {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .where('u.id', id)
    .select('c.name as name', 'c.id as category_id', 'u.username');
}

function findCategoryById(id, catId) {
  return db('users as u')
    .join('categories as c', 'u.id', 'c.users_id')
    .where('u.id', id)
    .andWhere('c.users_id', catId)
    .select('u.username', 'c.name')
    .first();
}

async function insertCategory(category, userId) {
  const [catId] = await db('categories').insert(category);

  return findCategoryById(userId, catId);
}

async function updateCategory(category, catId, userId) {
  await db('categories')
    .where('id', catId)
    .update(category);

  return findCategoryById(userId, catId);
}

//! FK constraint will not let this occur.
// function deleteCategory(id) {
//   return db('categories')
//     .where({ id })
//     .del();
//}

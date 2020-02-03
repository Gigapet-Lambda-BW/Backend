const db = require('../../data/db-config');

module.exports = {
  findCategories,
  findCategoryById,
  insertCategory,
  updateCategory,
};

function findCategories(id) {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .where('u.id', id)
    .select();
}

function findCategoryById(id, catId) {
  return db('users as u')
    .join('categories as c', 'u.id', 'c.users_id')
    .where('u.id', id)
    .andWhere('c.users_id', catId)
    .select('u.username', 'c.name')
    .first();
}

// ! mod to not need userId in production!!!
async function insertCategory(category, userId) {
  const [id] = await db('categories').insert(category);

  return findCategoryById(userId, id);
}

async function updateCategory(category, id, catId) {
  await db('categories')
    .where({ id })
    .update(category);

  return findCategoryById(id, catId);
}

//! FK constraint will not let this occur.
// function deleteCategory(id) {
//   return db('categories')
//     .where({ id })
//     .del();
//}

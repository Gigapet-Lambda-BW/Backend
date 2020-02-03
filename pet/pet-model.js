const db = require('../data/db-config');

module.exports = {
  findCategories,
  findCategoryById,
  //insertCategory,
};

function findCategories(id) {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .where('u.id', id)
    .select();
}

function findCategoryById(id, catId) {
  return db('users as u')
    .where('u.id', id)
    .join('categories as c')
    .where('c.id', catId)
    .select('u.username', 'c.name')
    .first();
}

const db = require('../data/db-config');

module.exports = {
  findCategories,
};

function findCategories(id) {
  return db('categories as c')
    .join('users as u', 'u.id', 'c.users_id')
    .where('u.id', id)
    .select();
}

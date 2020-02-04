const db = require('../../data/db-config');

module.exports = {
  getUsers,
  getUserById,
};

function getUsers() {
  return db('users').select('username');
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .select('username')
    .first();
}

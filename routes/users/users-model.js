const db = require('../../data/db-config');

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

function getUsers() {
  return db('users').select('username');
}

function getUserById(id) {
  return db('users')
    .where({ id })
    .select('id', 'username')
    .first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user);

  return getUserById(id);
}

async function updateUser(user, id) {
  await db('users')
    .where({ id })
    .update(user);

  return getUserById(id);
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

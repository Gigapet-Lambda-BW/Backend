const db = require('../data/db-config');
const bcrypt = require('bcryptjs');

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
};

function find() {
  return db('users').select();
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'password');
}

function findById(id) {
  return db('users')
    .where({ id })
    .select()
    .first();
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);

  const [id] = await db('users').insert(user);

  return findById(id);
}

async function update(id, user) {
  const [userId] = await db('users')
    .where({ id })
    .update(user);

  return findById(userId);
}

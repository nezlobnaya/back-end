const db = require('../data/db-config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  removeUser,
};

function find() {
  return db('users').select('id', 'username', 'role');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user)
  .returning('*');

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function removeUser(id) {
    return db('users').where({ id }).del()
}

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

  function add(user) {
  return db('users').insert(user)
  .returning('*');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function removeUser(id) {
    return db('users').where({ id }).del()
}

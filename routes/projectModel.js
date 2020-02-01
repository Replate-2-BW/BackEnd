const db = require('../data/db.js');

module.exports = {
  findUserById,
  editUserById,
  delUserById,
  addUser,
  findByProp,
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function editUserById(idPassed, userObj) {
  return db('users')
    .where({ id: idPassed })
    .update(userObj)
    .then(count => {
      return findUserById(idPassed);
    });
}

function delUserById(idPassed) {
  return db('users')
    .where({ id: idPassed })
    .del();
}

function addUser(userObj) {
  return db("users")
    .insert(userObj, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}

function findByProp(filterBy) {
    return db('users').where(filterBy);
}

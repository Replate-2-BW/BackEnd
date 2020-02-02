const db = require('../data/db.js');

module.exports = {
  unclaimedPickups,
  pickupsByVol,
  pickupsByBiz,
  findPickupById,
  editPickupById,
  delPickupById,
  addPickup,
}

function unclaimedPickups() {
  return db('pickupRequest')
    .where({ VolClaimed: false });
}

function pickupsByVol(idPassed) {
  return db('pickupRequest')
    .where({ volUserID: idPassed });
}

function pickupsByBiz(idPassed) {
  return db('pickupRequest')
    .where({ bizUserID: idPassed });
}

function findPickupById(id) {
  return db('pickupRequest')
    .where({ id })
    .first();
}

function editPickupById(idPassed, pickUpObj) {
  return db('pickupRequest')
    .where({ id: idPassed })
    .update(pickUpObj)
    .then(count => {
      return findPickupById(idPassed);
    });
}

function delPickupById(idPassed) {
  return db('pickupRequest')
    .where({ id: idPassed })
    .del();
}

function addPickup(userObj) {
  return db("pickupRequest")
    .insert(userObj, "id")
    .then(ids => {
      const [id] = ids;
      return findPickupById(id);
    });
}

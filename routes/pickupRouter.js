const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const myMidWare = require('../midWare/secret.js');
const isLoggedIn = require('../midWare/checkForLogin.js');

const PickupModel = require('./pickupModel.js');

const router = express.Router();

//ENDPINTS HERE
//POST	/api/auth/pickup/add	 add pickupRequest
router.post("/add", isLoggedIn, (request, responce) => {
  PickupModel.addPickup(request.body)
    .then(saved => {
      responce.status(201).json(saved);
    })
    .catch(error => {
      responce.status(500).json(error);
    });
});

//PUT	/api/auth/pickup/:id
router.put('/:id', isLoggedIn, (request, responce) => {
  PickupModel.editPickupById(request.params.id, request.body)
    .then(updated => { responce.status(201).json(updated); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "PUT Edit Pickup Failed."} )
    })
});

//GET	/api/auth/pickup/ (all unclaimed)
router.get('/', isLoggedIn, (request, responce) => {
  PickupModel.unclaimedPickups()
    .then(pickups => { responce.status(201).json(pickups); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get Unclaimed Pickups Failed."} )
    })
});

//GET	/api/auth/pickup/:id/vol/
router.get('/:id/vol/', isLoggedIn, (request, responce) => {
  PickupModel.pickupsByVol(request.params.id)
    .then(pickups => { responce.status(201).json(pickups); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get Pickups For this Volonteer Failed."} )
    })
});

//GET	/api/auth/pickup/:id/biz/
router.get('/:id/biz/', isLoggedIn, (request, responce) => {
  PickupModel.pickupsByBiz(request.params.id)
    .then(pickups => { responce.status(201).json(pickups); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get Pickups For this Volonteer Failed."} )
    })
});

//DEL	/api/auth/pickup/:id/del
router.delete('/:id/del', isLoggedIn, (request, responce) => {
  PickupModel.delPickupById(request.params.id)
    .then(numRemoved => { responce.status(201).json(numRemoved); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "DEL Failed."} )
    })
});

module.exports = router;

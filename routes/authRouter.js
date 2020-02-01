const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//const myMidWare = require('../midWare/secret.js');
const isLoggedIn = require('../midWare/checkForLogin.js');

const AuthModel = require('./projectModel.js');

const router = express.Router();

//ENDPINTS HERE
//GET	/api/auth/:id/user
router.get('/:id/user', isLoggedIn, (request, responce) => {
  AuthModel.findUserById(request.params.id)
    .then(user => { responce.json(user); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get USERS Failed."} )
    })
});

//PUT	/api/auth/:id/user	EDIT	NewObj, send (token)
router.put('/:id/user', (request, responce) => {
  AuthModel.editUserById(request.params.id, request.body)
    .then(numUpdated => { responce.json(numUpdated); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "PUT Edit User Failed."} )
    })
});

//DEL
router.delete('/:id/user/del', (request, responce) => {
  //db("cars").where({ id: request.params.id }).del()
  AuthModel.delUserById(request.params.id)
    .then(numRemoved => { responce.json(numRemoved); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "PUT Failed."} )
    })
});


//TOKEN
/*
function signToken(user) {
  const payload = {
    userID: user.id,
    userType: user.userType
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, myMidWare.jwtSecret, options);
}*/

module.exports = router;

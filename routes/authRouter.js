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
    .then(user => { responce.status(201).json(user); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "Get USERS Failed."} )
    })
});

//PUT	/api/auth/:id/user	EDIT	NewObj, send (token)
router.put('/:id/user', isLoggedIn, (request, responce) => {
  AuthModel.editUserById(request.params.id, request.body)
    .then(updated => { responce.status(201).json(updated); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "PUT Edit User Failed."} )
    })
});

//DEL
router.delete('/:id/user/del', isLoggedIn, (request, responce) => {
  AuthModel.delUserById(request.params.id)
    .then(numRemoved => { responce.status(201).json(numRemoved); })
    .catch( error => {
      console.log(error);
      responce.status(500).json( {error: "DEL Failed."} )
    })
});

module.exports = router;

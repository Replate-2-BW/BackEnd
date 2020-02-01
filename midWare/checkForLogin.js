const jwt = require('jsonwebtoken');

const myMidWare = require('./secret.js');


module.exports = (request, responce, next) => {
  const token = request.headers.authorization;

  if(token) {
    jwt.verify(token, myMidWare.jwtSecret, (error, decodedToken) => {
      if(error) { // the token is not valid
        responce.status(401).json({ you: "can't touch this!"})
      } else { //request.user = { house: decodedToken.house };
        next();
      }
    })
  } else {
    responce.status(401).json({ you: 'shall not pass!'})
  }
};

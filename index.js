//Dependancies
const express = require("express");
//SESSIONB DEPENDANCIES

// Import Data
const db = require('./data/db.js');

//START WITH EXPRESS
const server = express();

//SESSION


//CUSTOME MILLEWHARE/HANDLE FUNCTIONS OR INPORTS OF
function logger(request, responce, next) {
  const { method, originalUrl } = request;
  console.log(`${method} to ${originalUrl} at ${Date(Date.now())}`);

  next();
}

//MIDDLE WARE
server.use(express.json());
server.use(logger);

//ROUTES
const projectRouter = require('./routes/projectRouter.js');
const authRouter = require('./routes/authRouter.js');
const pickupRouter = require('./routes/pickupRouter.js');

//ENDPOINTS
server.get('/', logger, (req, res) => {
  res.send(`<h2>GLOBAL SERVER UP ENDPOINT</h2>`);
});

server.use('/api', projectRouter);
server.use('/api/auth', authRouter);
server.use('/api/auth/pickup', pickupRouter);


//LISTEN SERVER
const port = process.env.PORT || 8000;
server.listen(port, () => console.log((`\n ** api on: ${port} ** \n`)));

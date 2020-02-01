const db = require('../data/db.js');

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?',
}

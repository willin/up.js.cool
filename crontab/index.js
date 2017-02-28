const later = require('later');
const users = require('../config').users;
const crab = require('./crab');

users.forEach((x) => {
  later.setInterval(async () => {
    await crab(x);
  }, later.parse.recur().every(2).minute());
});

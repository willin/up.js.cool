const ENV = process.env.NODE_ENV || 'dev';

const users = require(`./users.${ENV}`);
const {redis, mysql} = require(`./server.${ENV}`);

module.exports = {
  users,
  redis,
  mysql
};

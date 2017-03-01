const ENV = process.env.NODE_ENV || 'dev';

const users = require(`./users.${ENV}`);
const {redis, mysql, cdn} = require(`./server.${ENV}`);

module.exports = {
  cdn,
  users,
  redis,
  mysql
};

/* eslint-disable import/no-dynamic-require */
const ENV = process.env.NODE_ENV || 'dev';

const users = require(`./users.${ENV}`);
const { redis, mysql, cdn, dingBot } = require(`./server.${ENV}`);

module.exports = {
  cdn,
  users,
  redis,
  mysql,
  dingBot
};

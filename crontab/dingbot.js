const Bot = require('dingbot');
const client = require('@xibang/redis');
const { redis: redisOptions, dingBot: dingBotOptions } = require('../config');
const { stateGet } = require('../model/data');

const redis = client(redisOptions);
const bot = new Bot(dingBotOptions);

module.exports = async (user) => {
  const status = await stateGet(user);
  const last = await redis.get(`up:bot:${user}`) || '';
  if (last !== status) {
    await redis.set(`up:bot:${user}`, status);
    await bot.text(`${user} is now ${status}.`);
  }
};

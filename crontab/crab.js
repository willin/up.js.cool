const Wr = require('wrescuetime');
const client = require('wulian-redis');
const {redis: redisOptions} = require('../config');

const redis = client(redisOptions);

module.exports = async ({user = '', key = ''} = {}) => {
  const wr = new Wr(key);
  const data = await wr.getData({
    rs: 'minute',
    pv: 'interval',
    rk: 'efficiency'
  });
  let last = await redis.get(`up:last:${user}`) || '{}';
  last = JSON.parse(last);
  console.log(user);
  console.log(data);
  console.log(last);
};

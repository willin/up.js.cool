const Wr = require('wrescuetime');
const client = require('@xibang/redis');
const { redis: redisOptions } = require('../config');

const redis = client(redisOptions);

module.exports = async ({ user = '', key = '' } = {}) => {
  const wr = Wr(key);
  const data = await wr.analyticData({
    rs: 'day',
    pv: 'rank',
    rk: 'efficiency',
    rb: '2016-06-06',
    re: '2016-06-06'
  });

  // ESOCKETTIMEDOUT
  let last = await redis.get(`up:last:${user}`) || '{}';
  last = JSON.parse(last);
  console.log(user);
  console.log(data);
  console.log(last);
};

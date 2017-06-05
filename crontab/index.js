const later = require('later');
const { users } = require('../config');
const { random } = require('../lib');
const { lastClear, historyClear } = require('../model/data');
const crab = require('./crab');
const updateCertbot = require('./certbot');
const dingbot = require('./dingbot');

users.forEach(async (x) => {
  // 每分钟抓取用户数据
  await crab(x);
  later.setInterval(async () => {
    await crab(x);
  }, later.parse.recur().every(random(50, 70)).second());
});

later.setInterval(async () => {
  await dingbot('willin');
}, later.parse.recur().every(random(50, 70)).second());

// 每天 0:00 清除计时器
later.setInterval(lastClear, later.parse.cron('0 0 */1 * * ?'));

// 每天 1:00 清除30天前历史数据
later.setInterval(historyClear, later.parse.cron('0 1 */1 * * ?'));

// 每周一 2:00 更新 certbot 证书
later.setInterval(updateCertbot, later.parse.cron('0 2 * * 1 ?'));

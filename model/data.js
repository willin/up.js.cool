const { pool, format } = require('wulian-mysql');
const moment = require('moment');
const client = require('wulian-redis');

const { mysql: mysqlOptions, redis: redisOptions } = require('../config');
const { isEmpty } = require('../lib');

moment.locale('zh-CN');
const DB = mysqlOptions.database;
const TABLENAME = `${DB}.data`;
const redis = client(redisOptions);

exports.dataAdd = async (user, [date, active,,, efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('INSERT INTO ?? (user,active,efficiency,date) VALUES (?,?,?,?)',
    [TABLENAME, user, active, efficiency, parseInt(new Date(date) / 1000, 10)]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};

exports.dataUpdate = async (user, [date, active,,, efficiency]) => {
  const mysql = await pool(mysqlOptions);
  const sql = format('UPDATE ?? SET active = ?, efficiency = ? WHERE user = ? AND date = ?',
    [TABLENAME, active, efficiency, user, parseInt(new Date(date) / 1000, 10)]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};

const lastGet = async (user) => {
  const last = await redis.get(`up:last:${user}`) || '[]';
  try {
    return JSON.parse(last);
  } catch (e) {
    return [];
  }
};

exports.lastGet = lastGet;

exports.lastSet = async (user, last) => {
  await redis.set(`up:last:${user}`, JSON.stringify(last));
};

exports.lastClear = async () => {
  const keys = await redis.keys('up:last:*');
  keys.forEach(async (item) => {
    await redis.del(item);
  });
};

exports.getState = async (user) => {
  const last = await lastGet(user);
  const time = Math.abs(moment(last).diff()) / 60000;
  const efficiency = parseFloat(last[4]);
  if (time > 60) {
    return 'offline';
  } else if (efficiency > 90) {
    return 'busy';
  } else if (efficiency < 50) {
    return 'free';
  }
  return 'online';
};

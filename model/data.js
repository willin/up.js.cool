const { pool, format } = require('wulian-mysql');
const moment = require('moment');
const client = require('wulian-redis');

const { mysql: mysqlOptions, redis: redisOptions } = require('../config');
const { isEmpty } = require('../lib');

moment.locale('zh-CN');
const DB = mysqlOptions.database;
const TABLENAME = `${DB}.data`;
const redis = client(redisOptions);

exports.dataAdd = async (user, [date, active, , , efficiency]) => {
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

exports.dataList = async (user) => {
  const key = `${DB}:data:${user}`;
  const data = await redis.get(key);
  if (data !== null) {
    try {
      return JSON.parse(data);
    } catch (e) {
      // await redis.del(key);
    }
  }
  const mysql = await pool(mysqlOptions);
  const sql = format('SELECT active,efficiency,date FROM ?? WHERE user = ? AND date > ? ORDER BY date DESC LIMIT 288',
    [TABLENAME, user, parseInt(new Date() / 1000, 10) - 86400]);
  const result = await mysql.query(sql);
  mysql.release();
  const returnData = isEmpty(result) ? [] : result;
  await redis.setex(key, 50, JSON.stringify(returnData));
  return returnData;
};

exports.historyClear = async () => {
  const mysql = await pool(mysqlOptions);
  const sql = format('DELETE FROM ?? WHERE date < ?',
    [TABLENAME, parseInt(new Date() / 1000, 10) - 86400 * 30]);
  const result = await mysql.query(sql);
  mysql.release();
  return isEmpty(result) ? -1 : result.affectedRows;
};

const lastGet = async (user) => {
  const last = await redis.get(`${DB}:last:${user}`) || '[]';
  try {
    return JSON.parse(last);
  } catch (e) {
    return [];
  }
};

exports.lastGet = lastGet;

exports.lastSet = async (user, last) => {
  await redis.set(`${DB}:last:${user}`, JSON.stringify(last));
};

exports.lastClear = async () => {
  const keys = await redis.keys(`${DB}:last:*`);
  keys.forEach(async (item) => {
    await redis.del(item);
  });
};

exports.stateGet = async (user) => {
  const last = await lastGet(user);
  if (last.length === 0) { return ''; }
  const time = Math.abs(moment(last[0]).diff()) / 60000;
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

const { isObject, isString, isNumber, isBoolean } = require('util');
/**
 * 判断是否为空
 * @param  {*} obj 任意
 * @return {boolean} 真为空，假为非空
 */
exports.isEmpty = (obj) => {
  if (isObject(obj)) {
    return Object.keys(obj).length === 0 && (obj.length === undefined || obj.length === 0);
  } else if (isString(obj)) {
    return obj.length === 0;
  } else if (isNumber(obj)) {
    return obj === 0;
  } else if (obj === null || obj === undefined) {
    return true;
  } else if (isBoolean(obj)) {
    return !obj;
  }
  return false;
};

/**
 * 随机数
 * @param {int} m m
 * @param {int} n n
 * @return {int}  生成 m 到 n 的随机整数
 */
exports.random = (m, n = m) => parseInt(Math.random() * (n - m) + m, 10);

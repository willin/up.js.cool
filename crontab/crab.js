const Wr = require('wrescuetime');
const { dataAdd, dataUpdate, lastGet, lastSet } = require('../model/data');

module.exports = async ({user = '', key = ''} = {}) => {
  const wr = new Wr(key);
  let data = {};
  try {
    data = await wr.getData({
      rs: 'minute',
      pv: 'interval',
      rk: 'efficiency'
    });
  } catch (e) {
    return;
  }

  const last = await lastGet(user);
  let operator = last.length === 0;

  data.rows.forEach(async (item) => {
    if (operator) {
      // 插入数据
      await dataAdd(user, item);
    } else if (item[0] === last[0]) {
      operator = true;
      if (item[1] !== last[1]) {
        // 更新最后一条数据
        await dataUpdate(user, item);
      }
    }
  });
  // 数据改变
  if (operator) {
    // 更新记录值
    await lastSet(user, data.rows.pop());
  }
};

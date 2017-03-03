const _ = require('koa-route');
const { dataList, stateGet } = require('../../model/data');

module.exports = (app) => {
  app.use(_.get('/:user/data', async (ctx, user) => {
    const data = await dataList(user);
    const status = await stateGet(user);
    ctx.type = 'json';
    ctx.body = {
      status,
      data
    };
  }));
};

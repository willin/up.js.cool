const _ = require('koa-route');
const { dataList } = require('../../model/data');

module.exports = (app) => {
  app.use(_.get('/:user/data', async (ctx, user) => {
    const data = await dataList(user);
    ctx.type = 'json';
    ctx.body = data;
  }));
};

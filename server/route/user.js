const _ = require('koa-route');
const view = require('../view');

module.exports = (app) => {
  app.use(_.get('/:user', async (ctx, user) => {
    ctx.type = 'html';
    ctx.body = view('user', {user});
  }));
};

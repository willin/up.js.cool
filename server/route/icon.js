const _ = require('koa-route');
const { getState } = require('../../model/data');
const { cdn } = require('../../config');

module.exports = (app) => {
  app.use(_.get('/icon/:user', async (ctx, user) => {
    const state = await getState(user);
    switch (state) {
      case 'busy': {
        ctx.redirect(`${cdn}busy.png`);
        break;
      }
      case 'free': {
        ctx.redirect(`${cdn}free.png`);
        break;
      }
      case 'online': {
        ctx.redirect(`${cdn}online.png`);
        break;
      }
      case 'offline':
      default: {
        ctx.redirect(`${cdn}offline.png`);
      }
    }
  }));
};

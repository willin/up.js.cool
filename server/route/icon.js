const _ = require('koa-route');
const { stateGet } = require('../../model/data');
const { cdn } = require('../../config');

module.exports = (app) => {
  app.use(_.get('/:user/icon', async (ctx, user) => {
    const state = await stateGet(user);
    switch (state) {
      case 'busy': {
        ctx.redirect(`${cdn}images/busy.png`);
        break;
      }
      case 'free': {
        ctx.redirect(`${cdn}images/free.png`);
        break;
      }
      case 'online': {
        ctx.redirect(`${cdn}images/online.png`);
        break;
      }
      case 'offline':
      default: {
        ctx.redirect(`${cdn}images/offline.png`);
      }
    }
  }));
};

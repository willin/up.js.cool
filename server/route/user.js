const _ = require('koa-route');
const view = require('../view');
const { users } = require('../../config');

module.exports = (app) => {
  app.use(_.get('/:user', async (ctx, user) => {
    ctx.type = 'html';
    ctx.body = view('user', {
      user,
      users: JSON.stringify(users.map(u => u.user))
    });
  }));
};

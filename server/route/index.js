const _ = require('koa-route');
const user = require('./user');
const data = require('./data');
const icon = require('./icon');
const e404 = require('./404');

module.exports = (app) => {
  app.use(_.get('/', (ctx) => {
    ctx.redirect('/willin');
  }));
  user(app);
  data(app);
  icon(app);
  e404(app);
};

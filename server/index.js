const Koa = require('koa');
const _ = require('koa-route');

const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

app.use(_.get('/', (ctx) => {
  ctx.body = 'Hello Koa';
}));

require('./route')(app);

app.listen(3000);

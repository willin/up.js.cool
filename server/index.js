const Koa = require('koa');

const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

require('./route')(app);

app.listen(4123);

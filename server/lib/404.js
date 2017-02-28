module.exports = (app) => {
  app.use(async (ctx, next) => {
    await next();

    if (this.status !== 404) return;

    // we need to explicitly set 404 here
    // so that koa doesn't assign 200 on body=
    this.status = 404;

    switch (this.accepts('html', 'json')) {
      case 'html':
        this.type = 'html';
        this.body = '<p>Page Not Found</p>';
        break;
      case 'json':
        this.body = {
          message: 'Page Not Found'
        };
        break;
      default:
        this.type = 'text';
        this.body = 'Page Not Found';
    }
  });
};

const e404 = require('./404');
const icon = require('./icon');

module.exports = (app) => {
  icon(app);
  e404(app);
};

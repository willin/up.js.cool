const path = require('path');
const { readFileSync } = require('fs');
const { cdn } = require('../../config');

module.exports = (view, params = {}) => {
  let html = readFileSync(path.join(__dirname, `${view}.html`), 'utf8').replace(/{{cdn}}/g, cdn);
  Object.keys(params).forEach((key) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), params[key]);
  });
  return html;
};

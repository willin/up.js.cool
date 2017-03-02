const { execSync: run } = require('child_process');

module.exports = () => {
  run('~/certbot-auto renew --dry-run');
};

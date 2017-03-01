// PM2 App Config
const path = require('path');

module.exports = {
  apps: [
    {
      name: 'up-server',
      script: 'index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      cwd: path.join(__dirname, './server'),
      error_file: path.join(__dirname, './log/server.err.log'),
      out_file: path.join(__dirname, './log/server.out.log'),
      max_memory_restart: '800M',
      instances: 0,
      exec_mode: 'cluster',
      merge_logs: true,
      env: {
        NODE_ENV: 'prod'
      }
    },
    {
      name: 'up-crontab',
      script: 'index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      cwd: path.join(__dirname, './crontab'),
      error_file: path.join(__dirname, './log/crontab.err.log'),
      out_file: path.join(__dirname, './log/crontab.out.log'),
      max_memory_restart: '800M',
      merge_logs: true,
      env: {
        NODE_ENV: 'prod'
      }
    }
  ]
};

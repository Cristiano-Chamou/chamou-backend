const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'chamou_db'
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    }
  }
};

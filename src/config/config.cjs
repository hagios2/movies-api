module.exports = {
  development: {
    username: process.env.USERNAME, //"ba57f3775ec5d8",
    password: process.env.PASSWORD, //"b2eae037",
    database: process.env.DATABASE, //"heroku_a37daea847e2cdf",
    host: process.env.HOST,//"us-cdbr-east-05.cleardb.net",
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  production: {
    username: process.env.USERNAME, //"ba57f3775ec5d8",
    password: process.env.PASSWORD, //"b2eae037",
    database: process.env.DATABASE, //"heroku_a37daea847e2cdf",
    host: process.env.HOST,//"us-cdbr-east-05.cleardb.net",
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}

module.exports = {
  development: {
    username: process.env.USERNAME, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
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

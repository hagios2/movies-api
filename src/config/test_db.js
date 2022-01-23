import sequelize from './db.js'

const testDbConnect = async () => {
    await sequelize.sync({ force: true })
}
  
const testDbClose = async () => {
    await sequelize.close()
}
  
export { testDbConnect, testDbClose}
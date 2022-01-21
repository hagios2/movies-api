import sequelize from '../config/db.js'
import pkg from 'sequelize'
const { DataTypes, Model} = pkg

class Comment extends Model {}

Model.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    episode_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
    comment: {
        type: DataTypes.TEXT(500),
        allowNull: false,
    },
}, {
  sequelize,
  timestamps: true,
  modelName: 'comments'
})

export { Comment }

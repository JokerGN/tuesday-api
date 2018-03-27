import Sequelize from 'sequelize'
import {database} from '../database'

let galleryModel = database.define('gallery', {
  galleryId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'gallery',
  freezeTableName: true,
  paranoid: true
})

export default galleryModel

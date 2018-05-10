import Sequelize from 'sequelize'
import {database} from '../database'
import imageModel from './image.model'

let galleryModel = database.define('gallery', {
  galleryId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  galleryName: {
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

galleryModel.hasMany(imageModel, {as: 'images', foreignKey: 'galleryId'})
imageModel.belongsTo(galleryModel, {as: 'gallery', foreignKey: 'galleryId'})

export default galleryModel

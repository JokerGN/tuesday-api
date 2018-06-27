import Sequelize from 'sequelize'
import {database} from '../database'
import tourImageModel from './tour_image.model'

let tourModel = database.define('tour', {
  tourId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tourName: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  tourDescription: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE,
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
  tableName: 'tour',
  freezeTableName: true,
  paranoid: true
})

tourModel.hasMany(tourImageModel, {as: 'tour_images', foreignKey: 'tourId'})
tourImageModel.belongsTo(tourModel, {as: 'tour', foreignKey: 'tourId'})


export default tourModel

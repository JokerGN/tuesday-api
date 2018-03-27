import Sequelize from 'sequelize'
import {database} from '../database'

let tourImageModel = database.define('tour_image', {
  tourImageId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  tourId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'tour',
      key: 'tourId'
    }
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
  tableName: 'tour_image',
  freezeTableName: true,
  paranoid: true
})

export default tourImageModel

import Sequelize from 'sequelize'
import {database} from '../database'

let imageModel = database.define('image', {
  imageId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imagePath: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  galleryId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'gallery',
      key: 'galleryId'
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
  tableName: 'image',
  freezeTableName: true,
  paranoid: true
})

export default imageModel

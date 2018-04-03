import Sequelize from 'sequelize'
import {database} from '../database'

let equipmentModel = database.define('equipment', {
  equipmentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imei: {
    type: Sequelize.INTEGER,
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
  tableName: 'equipment',
  freezeTableName: true,
  paranoid: true
})

export default equipmentModel

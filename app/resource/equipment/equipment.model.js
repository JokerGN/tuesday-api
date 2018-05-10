import Sequelize from 'sequelize'
import {database} from '../database'
import equipLogModel from './equip_log.model'

let equipmentModel = database.define('equipment', {
  equipmentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  imei: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM,
    values: ['walk', 'car'],
    defaultValue: ['walk']
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

equipLogModel.belongsTo(equipmentModel, {as: 'equipment', foreignKey: 'equipmentId'})
equipmentModel.hasMany(equipLogModel, {as: 'equip_log', foreignKey: 'equipmentId'})

export default equipmentModel

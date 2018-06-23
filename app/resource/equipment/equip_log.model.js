import Sequelize from 'sequelize'
import {database} from '../database'

let equipLogModel = database.define('equip_log', {
  equipLogId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  equipmentId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'equipment',
      key: 'equipmentId'
    }
  },
  lat: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  lng: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  x: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  y: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  z: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  alert_flag: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  log_time: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  tableName: 'equip_log',
  freezeTableName: true,
  paranoid: true
})

export default equipLogModel

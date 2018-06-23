import Sequelize from 'sequelize'
import equipLogModel from './equip_log.model'
import Pusher from '../../lib/pusher'

equipLogModel.addHook('afterCreate','sendNoti', (equip_log, options) => {
  Pusher.trigger('equipment_log', 'update_location', equip_log)
})

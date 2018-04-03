import Sequelize from 'sequelize'
import equipmentModel from './equipment.model'
import equipLogModel from './equip_log.model'

equipLogModel.addScope('equip_logWithimei', {
  include: [
    {
      as: 'equipment',
      model: equipmentModel,
      required: true,
      attributes: [
        'imei'
      ]
    }
  ]
})

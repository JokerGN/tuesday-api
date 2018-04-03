import Router from 'koa-router'
import Sequelize from 'sequelize'
import 'dotenv/config'
import EquipmentRepository from '../resource/equipment/equipment.repository'
import EquipLogRepository from '../resource/equipment/equip_log.repository'

const Equipment = new Router()

Equipment.post('/log_request', async function (context, next) {
  let equipmentId = ''
  let data = context.request.body
  await EquipmentRepository.findOrCreate({imei: data.imei}, {imei: data.imei})
  .spread((user, created) => {
      equipmentId = user.equipmentId
      EquipLogRepository.create({
        equipmentId: user.equipmentId,
        lat: data.lat,
        lng: data.lng,
        x: data.x,
        y: data.y,
        z: data.z,
        alert_flag: data.alert_flag,
        log_time: data.datetime
      })
  })
  context.body = await EquipLogRepository.findBy({equipmentId: equipmentId}, {
    scope: 'equip_logWithimei',
    limit: 1,
    order: Sequelize.literal('equipLogId DESC')
  })
})


export default Equipment

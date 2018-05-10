import Router from 'koa-router'
import Sequelize from 'sequelize'
import 'dotenv/config'
import EquipmentRepository from '../resource/equipment/equipment.repository'
import EquipLogRepository from '../resource/equipment/equip_log.repository'

const Equipment = new Router()

Equipment.get('/log_request', async function (context, next) {
  let data = context.request.query
  let latPos = Math.floor(data.lat/100) + Math.floor(data.lat%100)/60 + (data.lat - Math.floor(data.lat))/60
  let lngPos = Math.floor(data.lng/100) + Math.floor(data.lng%100)/60 + (data.lng - Math.floor(data.lng))/60
  await EquipmentRepository.findOrCreate({imei: data.imei},{imei: data.imei})
  .spread( async (user, created) => {
      await EquipLogRepository.create({
        equipmentId: user.equipmentId,
        lat: latPos,
        lng: lngPos,
        x: data.x,
        y: data.y,
        z: data.z,
        alert_flag: data.alert_flag,
        log_time: data.log_time
      })
      context.body = await EquipLogRepository.findBy({'$equipment.imei$': data.imei}, {
        scope: 'equip_logWithimei',
        limit: 1,
        order: Sequelize.literal('equipLogId DESC')
      })
  })
})

Equipment.get('/showall', async function (context, next) {
  context.body = await EquipmentRepository.findAndCountAllBy({}, {})
})

Equipment.post('/update_type', async function (context, next) {
  let data = context.request.body
  await EquipmentRepository.updateBy({equipmentId: data.equipmentId},{type: data.type})
  context.body = {
    status: "200",
    message: "update type completed"
  }
})

export default Equipment

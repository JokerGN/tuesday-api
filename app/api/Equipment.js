import Router from 'koa-router'
import Sequelize from 'sequelize'
import 'dotenv/config'
import EquipmentRepository from '../resource/equipment/equipment.repository'
import EquipLogRepository from '../resource/equipment/equip_log.repository'

const Equipment = new Router()

//close because not use
// Equipment.post('/log_request', async function (context, next) {
//   let data = context.request.body.sad
//   await EquipmentRepository.findOrCreate({imei: data.imei}, {imei: data.imei})
//   .spread( async (user, created) => {
//       await EquipLogRepository.create({
//         equipmentId: user.equipmentId,
//         lat: data.lat,
//         lng: data.lng,
//         x: data.x,
//         y: data.y,
//         z: data.z,
//         alert_flag: data.alert_flag,
//         log_time: data.datetime
//       })
//       context.body = await EquipLogRepository.findBy({'$equipment.imei$': data.imei}, {
//         scope: 'equip_logWithimei',
//         limit: 1,
//         order: Sequelize.literal('equipLogId DESC')
//       })
//   })
// })

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


export default Equipment

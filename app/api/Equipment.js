import Router from 'koa-router'
import Sequelize from 'sequelize'
import 'dotenv/config'
import EquipmentRepository from '../resource/equipment/equipment.repository'
import EquipLogRepository from '../resource/equipment/equip_log.repository'
import { createDecipher } from 'crypto';

const Equipment = new Router()

Equipment.post('/log_request', async function (context, next) {
  let data = context.request.body.sad
  await EquipmentRepository.findOrCreate({imei: data.imei}, {imei: data.imei})
  .spread( async (user, created) => {
      await EquipLogRepository.create({
        equipmentId: user.equipmentId,
        lat: data.lat,
        lng: data.lng,
        x: data.x,
        y: data.y,
        z: data.z,
        alert_flag: data.alert_flag,
        log_time: data.datetime
      })
      context.body = await EquipLogRepository.findBy({'$equipment.imei$': data.imei}, {
        scope: 'equip_logWithimei',
        limit: 1,
        order: Sequelize.literal('equipLogId DESC')
      })
  })
})

Equipment.get('/log_request', async function (context, next) {
  let data = context.request.query
  await EquipmentRepository.findOrCreate({imei: data.imei},{imei: data.imei})
  .spread( async (user, created) => {
      await EquipLogRepository.create({
        equipmentId: user.equipmentId,
        lat: data.lat,
        lng: data.lng,
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

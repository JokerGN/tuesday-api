import Router from 'koa-router'
import Sequelize from 'sequelize'
import 'dotenv/config'
import MomentTZ from 'moment-timezone'
import Moment from 'moment'
import EquipmentRepository from '../resource/equipment/equipment.repository'
import EquipLogRepository from '../resource/equipment/equip_log.repository'

const Equipment = new Router()

Equipment.get('/log_request', async function (context, next) {
  let data = context.request.query
  let latPos = Math.floor(data.lat/100) + Math.floor(data.lat%100)/60 + (data.lat - Math.floor(data.lat))/60
  let lngPos = Math.floor(data.lng/100) + Math.floor(data.lng%100)/60 + (data.lng - Math.floor(data.lng))/60
  let equipment = await EquipmentRepository.findBy({imei: data.imei})
  if (equipment.length !== 0) {
    let lastLog = await EquipLogRepository.findBy({'$equipment.imei$': data.imei}, {
      scope: 'equip_logWithimei',
      limit: 1,
      order: Sequelize.literal('equipLogId DESC')
    })
    if (lastLog.length !== 0) {
      let lastLogTime = MomentTZ(lastLog[0].log_time).tz('Asia/Bangkok')
      let inputLogTime = Moment(data.log_time)
      let timediff = Moment.duration(inputLogTime.diff(lastLogTime))
      if (timediff.hours() >= 0 && timediff.minutes() >= 10) {
        await EquipLogRepository.create({
          equipmentId: equipment[0].equipmentId,
          lat: latPos,
          lng: lngPos,
          x: data.x,
          y: data.y,
          z: data.z,
          alert_flag: data.alert_flag,
          log_time: data.log_time
        })
      }
    }
  }
  context.body = await EquipLogRepository.findBy({'$equipment.imei$': data.imei}, {
    scope: 'equip_logWithimei',
    limit: 1,
    order: Sequelize.literal('equipLogId DESC')
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

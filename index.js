import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import http from 'http'
import 'dotenv/config'
import IO from 'socket.io'
import Gallery from './app/api/Gallery'
import Tour from './app/api/Tour'
import Equipment from './app/api/Equipment'
import EquipmentRepository from './app/resource/equipment/equipment.repository'
import EquipLogRepository from './app/resource/equipment/equip_log.repository'
import Sequelize from 'sequelize'

const app = new Koa()
const router = new Router()

app.use(bodyParser({
  formLimit: "200mb"
}))
app.use(cors())

router.use('/gallery', Gallery.routes())
router.use('/tour', Tour.routes())
router.use('/equipment', Equipment.routes())

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)

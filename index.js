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
  formLimit: "100mb"
}))
app.use(cors())

router.use('/gallery', Gallery.routes())
router.use('/tour', Tour.routes())
router.use('/equipment', Equipment.routes())

app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())
const io = new IO(server)

io.on('connection', function (client) {
  console.log('Client connect id : ',client.id)
  getdata()
  async function getdata () {
    let data = await EquipmentRepository.findAndCountAllBy({},{})
    let equip_id = []
    data.rows.forEach(equip => {
      equip_id.push(equip.imei)
    })
    equip_id.forEach( async function (equipment) {
      let location = await EquipLogRepository.findBy({'$equipment.imei$': equipment}, {
        scope: 'equip_logWithimei',
        limit: 1,
        order: Sequelize.literal('equipLogId DESC')
      })
      io.emit('connected',  location)
    })
  }
  setInterval(getdata, 1000)
  client.on('disconnect', function () {
    console.log('Client disconnect id : ',client.id)
  })
})

console.log('App listen at PORT '+process.env.PORT)
server.listen(process.env.PORT)

import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import 'dotenv/config'
import GoogleMap from '@google/maps'
import Gallery from './app/api/Gallery'
import Tour from './app/api/Tour'
import Equipment from './app/api/Equipment'

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

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)

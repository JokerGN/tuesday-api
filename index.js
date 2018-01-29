import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import 'dotenv/config'

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(cors())

router.use('/', async function (context) {
  context.body = 'Hello koa api boilerplate'
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)

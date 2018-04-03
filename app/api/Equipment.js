import Router from 'koa-router'
import 'dotenv/config'

const Equipment = new Router()

Equipment.post('/log_request', async function (context, next) {
  let data = context.request.body
  context.body = data
})


export default Equipment

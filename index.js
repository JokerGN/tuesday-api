import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import 'dotenv/config'
import GoogleMap from '@google/maps'
import Gallery from './app/api/Gallery'
import Tour from './app/api/Tour'

const app = new Koa()
const router = new Router()

app.use(bodyParser({
  formLimit: "100mb"
}))
app.use(cors())

const map = GoogleMap.createClient({
  key: 'AIzaSyDsjjl1pM7Y_MHZ_UzymXDd0i16zmVQJdo'
})

// router.get('/', async function (context) {
//   map.geocode({
//     address: '1600 Amphitheatre Parkway, Mountain View, CA'
//   }, function(err, response) {
//     if (!err) {
//       console.log(response.json.results)
//     } else {
//       console.log(err)
//     }
//   })
// })

router.use('/gallery', Gallery.routes())
router.use('/tour', Tour.routes())

app.use(router.routes())
app.use(router.allowedMethods())

console.log('App listen at PORT '+process.env.PORT)
app.listen(process.env.PORT)

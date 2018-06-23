import pusher from 'pusher'
import 'dotenv/config'

const Pusher = new pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap1',
  encrypted: true
})

export default Pusher

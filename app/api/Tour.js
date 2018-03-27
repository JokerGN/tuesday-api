import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import fs from 'fs'
import TourRepository from '../resource/tour/tour.repository'
import TourImageRepository from '../resource/tour/tour_image.repository'
import 'dotenv/config'
import tourRepository from '../resource/tour/tour.repository';

const Tour = new Router()
const Upload = Multer({storage: storage}).array('file', 10)

Tour.post('/insert', Upload, async function (context, next) {
  let data = context.req.body
  let data_file = []
  context.req.files.forEach(file => {
    data_file.push(file.path)
  })

  let insertData = {
    tourName: data.tourName,
    tourDescription: data.tourDescription,
    dueDate: data.dueDate
  }

 await TourRepository.create(insertData)
 .then(function (tour) {
   if (tour) {
      let tourId = tour.dataValues.tourId
      data_file.forEach(file => {
        TourImageRepository.create({path: file, tourId: tourId})
      })
      context.body = {
        status: 200,
        message: 'Insert tour completed'
      }
   } else {
    context.body = {
      status: 403,
      message: 'Insert tour error'
    }
   }
 })
})

Tour.post('/update_tour', Upload, async function (context, next) {
  let data = context.req.body
  let data_file = []
  context.req.files.forEach(file => {
    data_file.push(file.path)
  })

  let updateData = {
    tourName: data.tourName,
    tourDescription: data.tourDescription,
    dueDate: data.dueDate
  }

 await TourRepository.updateBy({tourId: data.tourId}, updateData)
 .then(function (tour) {
   if (tour) {
      console.log(tour)
      data_file.forEach(file => {
        TourImageRepository.create({path: file, tourId: data.tourId})
      })
      context.body = {
        status: 200,
        message: 'Update tour completed'
      }
   } else {
    context.body = {
      status: 403,
      message: 'Update tour error'
    }
   }
 })
})

Tour.post('/delete_image_tour', async function (context, next) {
  let data = context.request.body
  let file = await TourImageRepository.findBy({tourImageId: data.tourImageId})
  fs.unlink('./'+file[0].path, function (error) {
    if (error) {
      throw error
    }
    TourImageRepository.deleteBy({tourImageId: data.tourImageId})
  })
  context.body = {
    status: 200,
    message: 'Delete file completed'
  }
})

Tour.post('/delete_tour', async function (context, next) {
  let data = context.request.body
  await TourRepository.deleteBy({tourId: data.tourId})
  context.body = {
    status: 200,
    message: 'Delete Tour completed'
  }
})

Tour.get('/uploads/:filename', async function (context, next) {
  let imageUrl = context.params.filename
  await Send(context, `./uploads/${imageUrl}`)
})

Tour.get('/showall', async function (context, next) {
  context.body = await tourRepository.findAndCountAllBy({}, {scope: 'tourdetail'})
})

export default Tour

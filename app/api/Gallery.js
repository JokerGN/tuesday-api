import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import fs from 'fs'
import GalleryRepository from '../resource/gallery/gallery.repository'
import 'dotenv/config'

const Gallery = new Router()
const Upload = Multer({storage: storage}).array('image', 10)

Gallery.post('/insert', Upload, async function (context, next) {
  let data = []
  context.req.files.forEach(file => {
    data.push(file.path)
  })
  data.forEach(data => {
    GalleryRepository.create({path: data})
  })
  context.body = {
    status: 200,
    message: "Upload completed"
  }
})

Gallery.post('/delete', async function (context, next) {
  let data = context.request.body
  let file = await GalleryRepository.findBy({galleryId: data.galleryId})
  fs.unlink('./'+file[0].path, function (error) {
    if (error) {
      throw error
    }
    GalleryRepository.deleteBy({galleryId: data.galleryId})
  })
  context.body = {
    status: 200,
    message: 'Delete file completed'
  }
})

Gallery.get('/showall', async function (context, next) {
  context.body = await GalleryRepository.findAndCountAllBy({}, {})
})

Gallery.get('/uploads/:filename', async function (context, next) {
  let imageUrl = context.params.filename
  await Send(context, `./uploads/${imageUrl}`)
})

export default Gallery

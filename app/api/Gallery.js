import Router from 'koa-router'
import Multer from 'koa-multer'
import Send from 'koa-send'
import storage from '../lib/filestorage'
import fs from 'fs'
import GalleryRepository from '../resource/gallery/gallery.repository'
import ImageRepository from '../resource/gallery/image.repository'
import 'dotenv/config'

const Gallery = new Router()
const Upload = Multer({storage: storage}).array('image', 10)

Gallery.post('/insert', Upload, async function (context, next) {
    let data = context.req.body
    if (data.galleryId) {
      let images = []
        context.req.files.forEach(file => {
          images.push(file.path)
        })
        images.forEach(image => {
          ImageRepository.create({imagePath: image, galleryId: data.galleryId})
        })
        context.body = {
          status: 200,
          message: "Upload completed"
        }
    } else {
      await GalleryRepository.findOrCreate({galleryName: data.galleryName}, {galleryName: data.galleryName})
      .spread( async (gallery, created) => {
        let images = []
        context.req.files.forEach(file => {
          images.push(file.path)
        })
        images.forEach(image => {
          ImageRepository.create({imagePath: image, galleryId: gallery.galleryId})
        })
        context.body = {
          status: 200,
          message: "Upload completed"
        }
      })
    }
})

Gallery.post('/delete', async function (context, next) {
  let data = context.request.body
  let file = await ImageRepository.findBy({imageId: data.imageId})
  fs.unlink('./'+file[0].imagePath, function (error) {
    if (error) {
      throw error
    }
    ImageRepository.deleteBy({imageId: data.imageId})
  })
  context.body = {
    status: 200,
    message: 'Delete file completed'
  }
})

Gallery.get('/showall', async function (context, next) {
  context.body = await GalleryRepository.findAndCountAllBy({}, {scope: 'gallerywithimage'})
})

Gallery.get('/uploads/:filename', async function (context, next) {
  let imageUrl = context.params.filename
  await Send(context, `./uploads/${imageUrl}`)
})

export default Gallery

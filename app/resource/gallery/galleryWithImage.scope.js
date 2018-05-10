import Sequelize from 'sequelize'
import galleryModel from './gallery.model'
import imageModel from './image.model'

galleryModel.addScope('gallerywithimage', {
  include: [
    {
      as: 'images',
      model: imageModel,
      required: true
    }
  ]
})

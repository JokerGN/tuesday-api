import Sequelize from 'sequelize'
import tourModel from './tour.model'
import tourImageModel from './tour_image.model'

tourModel.addScope('tourdetail', {
  include: [
    {
      as: 'tour_images',
      model: tourImageModel,
      required: true
    }
  ]
})

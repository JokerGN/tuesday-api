import {Promise} from 'sequelize'
import tourImageModel from './tour_image.model'
import BaseRepository from '../base.repository'
class TourImageRepository extends BaseRepository {

}

export default new TourImageRepository(tourImageModel, null)

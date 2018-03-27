import {Promise} from 'sequelize'
import tourModel from './tour.model'
import BaseRepository from '../base.repository'
import './tourWithImage.scope'
class TourRepository extends BaseRepository {

}

export default new TourRepository(tourModel, null)

import {Promise} from 'sequelize'
import imageModel from './image.model'
import BaseRepository from '../base.repository'
class ImageRepository extends BaseRepository {

}

export default new ImageRepository(imageModel, null)

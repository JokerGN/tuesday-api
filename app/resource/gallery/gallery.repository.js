import {Promise} from 'sequelize'
import galleryModel from './gallery.model'
import BaseRepository from '../base.repository'
import './galleryWithImage.scope'
class GalleryRepository extends BaseRepository {

}

export default new GalleryRepository(galleryModel, null)

import {Promise} from 'sequelize'
import equipmentModel from './equipment.model'
import BaseRepository from '../base.repository'
class EquipmentRepository extends BaseRepository {

}

export default new EquipmentRepository(equipmentModel, null)

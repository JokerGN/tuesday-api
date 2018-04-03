import {Promise} from 'sequelize'
import equipLogModel from './equip_log.model'
import BaseRepository from '../base.repository'
class EquipLogRepository extends BaseRepository {

}

export default new EquipLogRepository(equipLogModel, null)

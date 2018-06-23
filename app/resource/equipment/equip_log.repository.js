import {Promise} from 'sequelize'
import equipLogModel from './equip_log.model'
import BaseRepository from '../base.repository'
import './equip_logWithimei.scope'
import './equip_log.hook'
class EquipLogRepository extends BaseRepository {

}

export default new EquipLogRepository(equipLogModel, null)

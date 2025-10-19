import {addAttendance} from '../controllers/attendance.controller.js';
import {viewAttendance} from '../controllers/attendance.controller.js';
import {Router} from 'express'

const router = Router()

router.route('/').post(addAttendance).get(viewAttendance);

export default router;
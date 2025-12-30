import {addAttendance} from '../controllers/attendance.controller.js';
import {viewAttendance} from '../controllers/attendance.controller.js';
import {deleteAttendance} from '../controllers/attendance.controller.js';
import {Router} from 'express'
import {protect} from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/').post(addAttendance).get(viewAttendance).delete(deleteAttendance);

export default router;
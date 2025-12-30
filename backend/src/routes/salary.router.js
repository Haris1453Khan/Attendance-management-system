import {Router} from 'express';
import {calculateSalary} from '../controllers/salary.controller.js';
import {protect} from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.route('/').post(calculateSalary);

export default router;
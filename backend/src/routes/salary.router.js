import {Router} from 'express';
import {calculateSalary} from '../controllers/salary.controller.js';
import {fetchSalary} from '../controllers/salary.controller.js';

const router = Router();

router.route('/').post(calculateSalary).get(fetchSalary);

export default router;
import {Router} from 'express';
import {addEmployee} from '../controllers/handleEmployee.controller.js';
import {deleteEmployee} from '../controllers/handleEmployee.controller.js';
import {updateEmployee} from '../controllers/handleEmployee.controller.js';
import {fetchEmployee} from '../controllers/handleEmployee.controller.js';

const router = Router();

router.route('/').get(fetchEmployee).post(addEmployee);;
router.route('/:id').put(updateEmployee).delete(deleteEmployee);

export default router;
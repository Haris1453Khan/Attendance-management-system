import {Router} from 'express'
import {addAdvance} from '../controllers/advance.controller.js';
import {viewAdvance} from '../controllers/advance.controller.js';
import {deleteAdvance} from '../controllers/advance.controller.js';

const router = Router();

router.route('/').post(addAdvance).get(viewAdvance).delete(deleteAdvance);

export default router;
import {Router} from 'express'
import {addAdvance} from '../controllers/advance.controller.js';
import {viewAdvance} from '../controllers/advance.controller.js';
import {deleteAdvance} from '../controllers/advance.controller.js';
import {protect} from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/').post(addAdvance).get(viewAdvance).delete(deleteAdvance);

export default router;
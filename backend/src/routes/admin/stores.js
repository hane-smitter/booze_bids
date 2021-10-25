import express from 'express';

import { 
    getStores, 
    createStore,
    updateStore,
    deleteStore 
} from '../../controllers/admin/stores.js';
import { validate } from "../../middlewares/validator/index.js";
import { adminCheck } from '../../middlewares/auth.js';

const router = express.Router();

// router.use(adminCheck);

router.get('/', getStores);
router.post('/create', createStore);
router.patch('/update/:id', updateStore);
router.delete('/delete/:id', deleteStore);

export default router;
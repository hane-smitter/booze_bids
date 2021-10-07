import express from 'express';

import { getStores } from '../controllers/user/stores.js';
import adminRoutes from './admin/stores.js';

const router = express.Router();

router.get('/', getStores);
router.use('/admin', adminRoutes);

export default router;
import express from 'express';

import { getUsers } from '../controllers/user/users.js';
import adminRoutes from './admin/users.js';

const router = express.Router();

router.get('/', getUsers);
router.use('/admin', adminRoutes);

export default router;
import express from 'express';

import { getUsers, createUser, loginUser } from '../controllers/user/users.js';
import adminRoutes from './admin/users.js';

const router = express.Router();

router.get('/', getUsers);
router.use('/admin', adminRoutes);
router.post('/create', createUser);
router.post('/login', loginUser);

export default router;
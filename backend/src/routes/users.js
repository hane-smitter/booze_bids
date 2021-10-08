import express from 'express';

import { getUsers, createUser, loginUser } from '../controllers/user/users.js';
import adminRoutes from './admin/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/login', loginUser);
router.use('/admin', adminRoutes);

export default router;
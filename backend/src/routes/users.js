import express from 'express';

import { getUsers, createUser, loginUser, generateOtp, verifyOtp} from '../controllers/user/users.js';
import adminRoutes from './admin/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/generate-otp', generateOtp);
router.post('/verify-otp', verifyOtp);
router.use('/admin', adminRoutes);

export default router;
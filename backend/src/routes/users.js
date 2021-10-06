import express from 'express';

import { getUsers } from '../controllers/users.js';
import { createUser, loginUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/login', loginUser);

export default router;
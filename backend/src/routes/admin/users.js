import express from 'express';

import { getUsers, createUser } from '../../controllers/admin/users.js';

import { validate } from "../../middlewares/validator/index.js";
import { adminCheck } from '../../middlewares/auth.js';

const router = express.Router();

router.use(adminCheck);

router.get('/', getUsers);
router.post('/create', createUser);

export default router;
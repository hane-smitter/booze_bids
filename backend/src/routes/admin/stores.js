import express from 'express';

import { getStores } from '../../controllers/admin/stores.js';
import { validate } from "../../middlewares/validator/index.js";
import { adminCheck } from '../../middlewares/auth.js';

const router = express.Router();

router.use(adminCheck);

router.get('/', getStores);

export default router;
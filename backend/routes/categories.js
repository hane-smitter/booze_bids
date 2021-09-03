import express from 'express';

import { getCategories } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getCategories);

export default router;
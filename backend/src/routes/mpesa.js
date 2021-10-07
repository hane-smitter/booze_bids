import express from 'express';

import { callback } from '../controllers/admin/mpesa.js';

const router = express.Router();

router.get('/callback', callback);

export default router;
import express from 'express';

import { getBids } from '../controllers/bids.js';

const router = express.Router();

router.get('/', getBids);

export default router;
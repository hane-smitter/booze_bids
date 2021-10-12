import express from 'express';

import { callback, stkPush, validation, confirmation } from '../controllers/user/mpesa.js';

const router = express.Router();

router.get('/callback', callback);
router.get('/stk-push', stkPush);
router.get('/validation', validation);
router.get('/confirmation', confirmation);

export default router;
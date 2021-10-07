import express from "express";

import {
  createBid,
  getHighestAmountBidder,
  getLastBidder,
} from "../controllers/user/bids.js";
import { validate } from "../middlewares/validator/index.js";
import adminRoutes from './admin/bids.js';

const router = express.Router();

router.route("/").post(validate("createBid"), createBid);

router.get("/amount/high", getHighestAmountBidder);
router.get("/last", getLastBidder);
router.use('/admin', adminRoutes);

export default router;

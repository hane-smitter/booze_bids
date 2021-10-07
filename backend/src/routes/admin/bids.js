import express from "express";

import {
  getBids,
  createBid,
  getHighestAmountBidder,
  getLastBidder,
} from "../../controllers/admin/bids.js";
import { validate } from "../../middlewares/validator/index.js";
import { adminCheck } from '../../middlewares/auth.js';


const router = express.Router();
router.use(adminCheck);

router.route("/").get(getBids).post(validate("createBid"), createBid);

router.get("/amount/high", getHighestAmountBidder);
router.get("/last", getLastBidder);

export default router;

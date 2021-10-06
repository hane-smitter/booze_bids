import express from "express";

import {
  getBids,
  createBid,
  getHighestAmountBidder,
  getLastBidder,
} from "../controllers/bids.js";
import { validate } from "../middlewares/validator/index.js";

const router = express.Router();

router.route("/").get(getBids).post(validate("createBid"), createBid);

router.get("/amount/high", getHighestAmountBidder);
router.get("/last", getLastBidder);

export default router;

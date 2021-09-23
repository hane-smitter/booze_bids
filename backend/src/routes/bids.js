import express from "express";

import {
  getBids,
  createBid,
  getHighestAmountBidder,
} from "../controllers/bids.js";
import { validate } from "../middlewares/validator/index.js";

const router = express.Router();

router.route("/").get(getBids).post(validate("createBid"), createBid);

router.get("/amount/high", getHighestAmountBidder);

export default router;

import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Bid from "../models/Bid.js";
import Product from "../models/Product.js";
import ProductBidDetail from "../models/ProductBidDetail.js";
import User from "../models/User.js";

export const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({}).sort([["createdAt", -1]]);

    res.json(bids);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};
//customer bidding for a product
export const createBid = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }

  try {
    let { bidder, productId, bidPrice, bidAmount } = req.body;
    let user = await User.findOrCreate(bidder);
    if(user === "NEW") {
      return res.status(202).json({ info: { message: "Is a new user", code: "newbiddinguser"} });
    }

    let productBidInfo = await ProductBidDetail.findOne({product: mongoose.Types.ObjectId(productId)}).lean();
    if(!productBidInfo) {
      res.status(404).json({ err: [{ error: "Sorry this product is not found" }] });
      return;
    }
    bidPrice = productBidInfo.bidPrice;

    //generate slot figure
    if(bidAmount < bidPrice) {
      res.status(422).json({ err: [{ error: "Amount bidding is way Low!" }] });
      return;
    }
    let slot = Math.floor(bidAmount / bidPrice);

    const userId = user._id;

    const bid = new Bid({
      user: userId,
      product: productId,
      bidPrice,
      bidAmount,
    });

    await Promise.all([
      ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $inc: { slots: -slot } }),
      user.save(),
      bid.save()
    ]);

    res.json({ bid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

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
    // let dbSlot;
    let slotField = 'slots';
    let updateSlot = {};
    if( bidAmount < 1 || bidPrice < 1 || isNaN(bidAmount) || isNaN(bidPrice) ) throw new Error("Indivisible numbers");
    let slot = Math.floor(bidAmount / bidPrice);
    // if(slot > productBidInfo.slots) slotField = 'extraSlots';
    if(slot > productBidInfo.slots && slotField == 'slots') {
      // await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $set: {slots: 0} });
      slotField = 'extraSlots';
      let exSlot = slot - productBidInfo.slots;
      slot = exSlot;

      if(slot > productBidInfo.extraSlots) {
        await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $set: {extraSlots: 0, slots: 0, status: 'Inactive'} }, { new: true, runValidators: true });
        let exSlot = slot - productBidInfo.extraSlots;
        return res.status(403).json({ err: [{ error: "slot extra by " + exSlot }] });
      } else {
        updateSlot[slotField] = -slot;
        await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $inc: updateSlot, $set: {slots: 0} }, { new: true, runValidators: true });
      }
    } else {
      updateSlot[slotField] = -slot;
      await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $inc: updateSlot }, { new: true, runValidators: true });
    }
    
    
    const userId = user._id;

    const bid = new Bid({
      user: userId,
      product: productId,
      bidPrice,
      bidAmount,
    });

    await Promise.all([
      user.save(),
      bid.save()
    ]);

    res.json({ bid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

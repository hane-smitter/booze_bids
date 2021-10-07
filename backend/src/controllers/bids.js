import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Bid from "../models/Bid.js";
import Mpesa from "../models/Mpesa.js";
import Product from "../models/Product.js";
import ProductBidDetail from "../models/ProductBidDetail.js";
import User from "../models/User.js";
import { stkPush } from "./mpesa.js";

export const getBids = async (req, res) => {
  try {
    /* const bids = await Bid.find({}).populate({
      path: 'prodbiddetails',
      populate: {
        path: 'product'
      }
    }).populate('user').sort([["createdAt", -1]]); */
    const bids = await ProductBidDetail.find({}).populate('product').populate('prodbids');

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
    let { phone, bidder, productId, bidPrice, bidAmount } = req.body;
    let user = await User.findOrCreate(bidder);
    if(user === "NEW") {
      return res.status(202).json({ info: { message: "Welcome, get registered with us", severity: "info", code: "newbiddinguser"} });
    }

    let productBidInfo = await ProductBidDetail.findOne({product: mongoose.Types.ObjectId(productId)}).lean();
    if(!productBidInfo) {
      return res.status(404).json({ err: [{ msg: "Sorry this product is not found" }] });
    }
    bidPrice = productBidInfo.bidPrice;

    //generate slot figure
    if(bidAmount < bidPrice) {
      res.status(422).json({ err: [{ msg: "Amount bidding is way Low!" }] });
      return;
    }
    // let dbSlot;
    let slotField = 'slots';
    let updateSlot = {};
    if( bidAmount < 1 || bidPrice < 1 || isNaN(bidAmount) || isNaN(bidPrice) ) throw new Error("Indivisible numbers");
    let slot = Math.floor(bidAmount / bidPrice);
    if(slot > productBidInfo.slots && slotField == 'slots') {
      slotField = 'extraSlots';
      let exSlot = slot - productBidInfo.slots;
      slot = exSlot;

      if(slot > productBidInfo.extraSlots) {
        await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $set: {extraSlots: 0, slots: 0, status: 'Inactive'} }, { new: true, runValidators: true });
        let exSlot = slot - productBidInfo.extraSlots;
        return res.status(403).json({ err: [{ msg: "Sorry! Item not available for bidding" }] });
      } else {
        updateSlot[slotField] = -slot;
        await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $inc: updateSlot, $set: {slots: 0} }, { new: true, runValidators: true });
      }
    } else {
      updateSlot[slotField] = -slot;
      await ProductBidDetail.updateOne({ _id: productBidInfo._id }, { $inc: updateSlot }, { new: true, runValidators: true });
    }
    
    let successMsg = {
      info: {
      message: "Success! Your Bid has been placed." ,
      severity: "success",
      code: "makebid"
      }
    }
    const userId = user._id;
    let bidExists = await Bid.findOne({ user: mongoose.Types.ObjectId(userId), product: mongoose.Types.ObjectId(productId) });
    if(bidExists) {
      bidExists.bidAmount.push(bidAmount);
      bidExists.bidsCount += 1;
      const bid = await bidExists.save();
      return res.json(successMsg);
    }
    const bid = new Bid({
      user: userId,
      product: productId,
      bidPrice,
      bidAmount: [bidAmount],
    });

    await bid.save();
    //trigger mpesa
    let mpesa = stkPush(bidAmount, phone ? phone : bidder.phone)
    //store mpesa
    let mpesaResponse = new Mpesa({
      mechant: mpesa.JSON.stringify(),
      phone: phone ? phone : bidder.phone,
      amount: bidAmount,
      bid: bid._id,
      mpesaRef: "",
      name: "", 
      status: "", 
      description: ""
    })
    await mpesaResponse.save();
    res.json(successMsg);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

export const getHighestAmountBidder = async (req, res) => {
  try {
    const undoneBid = await ProductBidDetail.find({"extraslots":0}).populate('user').sort('-bidAmountTotal');

    res.json({ bidder });
  } catch{
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
}
export const getLastBidder = async (req, res) => {
  try {
    const bidder = await Bid.findOne({}).populate('user').sort('-bidsCount');

    res.json({ bidder });
  } catch{
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
}
//auto update +24hrs if slots still there
export const updateBidabbles = async (req, res) => {
  try {
    // const biddableProducts = await ProductBidDetail.find({
    //   endTime: { $lt: new Date().toISOString() },
    //   status: "Active",
    // });
    const biddableProducts = ProductBidDetail.updateMany({"endTime": { $lt: new Date().toISOString() }, "status": "Active"},
    {$set:{"endTime": new Date(new Date().getTime() + 60 * 60 * 24 * 1000)}})
    // biddableProducts['endTime'] = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    // await biddableProducts.save();

    return 'success';
} catch (error) {
    return error.message;//"Something went wrong";
}
}
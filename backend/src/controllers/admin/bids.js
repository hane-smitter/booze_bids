import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";

import Bid from "../../models/Bid.js";
import Mpesa from "../../models/Mpesa.js";
import Product from "../../models/Product.js";
import ProductBidDetail from "../../models/ProductBidDetail.js";
import User from "../../models/User.js";
import { stkPush } from "./mpesa.js";

export const getBids = async (req, res, next) => {
  try {
    /* const bids = await Bid.find({}).populate({
      path: 'prodbiddetails',
      populate: {
        path: 'product'
      }
    }).populate('user').sort([["createdAt", -1]]); */
    const bids = await ProductBidDetail.find({ status: "Active" })
      .populate("product")
      .populate("prodbids");

    res.json(bids);
  } catch (err) {
    next(err);
  }
};
//getExpiredBids
export const getExpiredBids = async (req, res, next) => {
  try {
    const bids = await ProductBidDetail.find({ status: "Inactive" })
      .populate("product")
      .populate("prodbids");

    res.json(bids);
  } catch (err) {
    next(err);
  }
};
//customer bidding for a product
export const createBid = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new ErrorResponse(undefined, 422, errors.array());
    }

    let { bidder, productId, bidPrice, bidAmount } = req.body;
    let user = await User.findOrCreate(bidder);
    if (user === "NEW") {
      return res.status(202).json({
        info: {
          message: "Welcome, get registered with us",
          severity: "info",
          code: "newbiddinguser",
        },
      });
    }

    let productBidInfo = await ProductBidDetail.findOne({
      product: mongoose.Types.ObjectId(productId),
    }).lean();
    if (!productBidInfo) {
      throw new ErrorResponse("Sorry this product is not found", 404);
    }
    bidPrice = productBidInfo.bidPrice;

    //generate slot figure
    if (bidAmount < bidPrice) {
      throw new ErrorResponse("Amount bidding is way low", 422);
    }
    // let dbSlot;
    let slotField = "slots";
    let updateSlot = {};
    if (bidAmount < 1 || bidPrice < 1 || isNaN(bidAmount) || isNaN(bidPrice))
      throw new Error("Indivisible numbers");
    let slot = Math.floor(bidAmount / bidPrice);
    if (slot > productBidInfo.slots && slotField == "slots") {
      slotField = "extraSlots";
      let exSlot = slot - productBidInfo.slots;
      slot = exSlot;

      if (slot > productBidInfo.extraSlots) {
        await ProductBidDetail.updateOne(
          { _id: productBidInfo._id },
          { $set: { extraSlots: 0, slots: 0, status: "Inactive" } },
          { new: true, runValidators: true }
        );
        let exSlot = slot - productBidInfo.extraSlots;
        throw new ErrorResponse("Sorry! Item not available for bidding", 403);
      } else {
        updateSlot[slotField] = -slot;
        await ProductBidDetail.updateOne(
          { _id: productBidInfo._id },
          { $inc: updateSlot, $set: { slots: 0 } },
          { new: true, runValidators: true }
        );
      }
    } else {
      updateSlot[slotField] = -slot;
      await ProductBidDetail.updateOne(
        { _id: productBidInfo._id },
        { $inc: updateSlot },
        { new: true, runValidators: true }
      );
    }

    let successMsg = {
      info: {
        message: "Success! Your Bid has been placed.",
        severity: "success",
        code: "makebid",
      },
    };
    const userId = user._id;
    let bidExists = await Bid.findOne({
      user: mongoose.Types.ObjectId(userId),
      product: mongoose.Types.ObjectId(productId),
    });
    if (bidExists) {
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
    let mpesa = stkPush(bidAmount, phone ? phone : bidder.phone);
    //store mpesa
    let mpesaResponse = new Mpesa({
      mechant: mpesa.JSON.stringify(),
      phone: phone ? phone : bidder.phone,
      amount: bidAmount,
      bid: bid._id,
      mpesaRef: "",
      name: "",
      status: "",
      description: "",
    });
    await mpesaResponse.save();
    res.json(successMsg);
  } catch (err) {
    next(err);
  }
};

export const getHighestAmountBidder = async (req, res, next) => {
  try {
    const undoneBid = await ProductBidDetail.find({ extraslots: 0 })
      .populate("user")
      .sort("-bidAmountTotal");

    res.json({ bidder });
  } catch {
    next(err);
  }
};
export const getLastBidder = async (req, res, next) => {
  try {
    const bidder = await Bid.findOne({}).populate("user").sort("-bidsCount");

    res.json({ bidder });
  } catch {
    next(err);
  }
};
export const getWinners = async (req, res, next) => {
  try {
    const winners = await ProductBidDetail.find({
      slots: 0,
      extraSlots: 0,
      status: "Inactive",
    }).populate({
      path: "prodbids",
      options: { sort: { bidAmountTotal: -1 }, limit: 1 },
      populate: [
        {
          path: "product",
          select: "-category -category_slug"
        },
        {
          path: "user",
        },
      ],
    });
    res.json(winners);
  } catch (err) {
    next(err);
  }
};
//auto update +24hrs if slots still there
export const updateBidabbles = async (req, res) => {
  try {
    // const biddableProducts = await ProductBidDetail.find({
    //   endTime: { $lt: new Date().toISOString() },
    //   status: "Active",
    // });
    const biddableProducts = await ProductBidDetail.updateMany(
      { endTime: { $lt: new Date().toISOString() }, status: "Active" },
      {
        $set: { endTime: new Date(new Date().getTime() + 60 * 60 * 24 * 1000) },
      },
      { multi: true }
    );
    // biddableProducts['endTime'] = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    // await biddableProducts.save();
    console.log(biddableProducts);
    return "success";
  } catch (error) {
    return error.message; //"Something went wrong";
  }
};

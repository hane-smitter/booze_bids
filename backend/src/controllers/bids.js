import { validationResult } from "express-validator";

import Bid from "../models/Bid.js";
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
export const createBid = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }

  try {
    const { phone, productId, bidPrice, bidAmount } = req.body;
    let user = await User.findOrCreate(phone);

    const userId = user._id;

    const bid = new Bid({
      user: userId,
      product: productId,
      bidPrice,
      bidAmount,
    });

    await Promise.all([user.save(), bid.save()]);
    console.log("bid created !!");
    console.log(bid);
    console.log("user");
    console.log(user);

    res.json({ bid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

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
  console.log("req.body");
  console.log(req.body);
  //finding if user exists
  let modelErrors = [];
  let userExists = await User.findExistent(req.body.phone);
  if (userExists)
    modelErrors.unshift({
      value: "",
      msg: "This phone number is taken",
      param: "phone",
      location: "body",
    });

  const errors = validationResult(req);
  if (!errors.isEmpty() || modelErrors.length) {
    res.status(422).json({ err: [...(errors.array() || []), ...modelErrors] });
    return;
  }

  try {
    const { phone, productId, bidPrice, bidAmount } = req.body;
    const user = new User({ phone });

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

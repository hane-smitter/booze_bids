// import json from 'body-parser';
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";
import User from "../../models/User.js";

//get users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
//create user
export const createUser = async (req, res, next) => {
  const user = req.body;
  try {
    if (!user) throw new ErrorResponse("User is requires", 422);
    const newUser = new User(user);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

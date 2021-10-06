import jwt from "jsonwebtoken";

import AuthUser from "../models/AuthUser.js";

export const authCheck = async (req, res, next) => {
  let auth = req.header("Authorization");
  try {
    if(!auth || !auth.startsWith('Bearer')) throw new Error('You are not authorized');
    let token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthUser.findById(decoded._id);
    req.user = user;
    req.token = token;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: [{ msg: err.message }] });
  }
};

export const adminCheck = async (req, res, next) => {
  let auth = req.header("Authorization");
  try {
    if(!auth || !auth.startsWith('Bearer')) throw new Error('You are not authorized');
    let token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUser = await AuthUser.findById(decoded._id);
    if (adminUser.role !== "Admin") throw new Error("Admin resource. Access denied.");
    req.admin = adminUser;
    req.token = token;
    console.log('adminUser');
    console.log(adminUser);
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: [{ msg: err.message }] });
  }
};

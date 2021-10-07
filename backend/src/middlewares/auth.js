import jwt from "jsonwebtoken";

import AuthUser from "../models/AuthUser.js";
import ErrorResponse from "../_helpers/error/ErrorResponse.js";

export const authCheck = async (req, res, next) => {
  let auth = req.header("Authorization");
  try {
    if(!auth || !auth.startsWith('Bearer')) throw new ErrorResponse('Unauthorized', 401);
    let token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthUser.findById(decoded._id);
    if (user.role !== "User") throw new ErrorResponse("User resource. Access denied.", 401);
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

export const adminCheck = async (req, res, next) => {
  let auth = req.header("Authorization");
  try {
    if(!auth || !auth.startsWith('Bearer')) throw new ErrorResponse('Unauthorized', 401);
    let token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminUser = await AuthUser.findById(decoded._id);
    if (adminUser.role !== "Admin") throw new ErrorResponse("Admin resource. Access denied.", 401);
    req.admin = adminUser;
    req.token = token;
    console.log('adminUser');
    console.log(adminUser);
    next();
  } catch (err) {
    next(err);
  }
};

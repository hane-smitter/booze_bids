import jwt from "jsonwebtoken";

import AuthUser from "../models/AuthUser.js";
import ErrorResponse from "../_helpers/error/ErrorResponse.js";

export const authCheck = async (req, res, next) => {
  let auth = req.header("Authorization");
  try {
    if(!auth || !auth.startsWith('Bearer')) throw new ErrorResponse('Unauthorized', 401);
    const token = auth.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthUser.findById(decoded._id);

    const foundToken = user.tokens.find((tokenObj) => tokenObj.token === token);
    if(!foundToken) throw new ErrorResponse("Unauthorized", 401);
    req.admin.tokens = req.admin.tokens.filter(
      (token) => token.token !== req.token
    );

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
    const foundToken = adminUser.tokens.find((tokenObj) => tokenObj.token === token);
    if(!foundToken) throw new ErrorResponse("Unauthorized", 401);
    if (adminUser.role !== "Admin") throw new ErrorResponse("Admin resource. Access denied.", 401);
    req.admin = adminUser;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

import express from "express";

import {
  register,
  login,
  logout,
  forgotPassword,
  resetpassword,
  registerAdmin,
} from "../controllers/auth.js";
import { authCheck } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/admin/create", registerAdmin);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:resetToken", resetpassword);
router.post("/logout", authCheck, logout);

export default router;

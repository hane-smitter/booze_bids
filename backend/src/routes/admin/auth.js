import express from "express";

import {
  logout,
  getAdmins,
  registerAdmin,
  resetpassword,
  forgotPassword,
  login,
  register,
} from "../../controllers/admin/auth.js";
import { adminCheck } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:resetToken", resetpassword);
router.post("/create", adminCheck, registerAdmin);
router.post("/logout", adminCheck, logout);
router.get("/", getAdmins);

export default router;

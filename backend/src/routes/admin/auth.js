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
import { getDashboardData } from "../../controllers/admin/dashboard.js";
import { adminCheck } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:resetToken", resetpassword);
router.post("/create", adminCheck, registerAdmin);
router.post("/logout", adminCheck, logout);
router.get("/", getAdmins);

router.get("/dashboard-data", getDashboardData);

export default router;

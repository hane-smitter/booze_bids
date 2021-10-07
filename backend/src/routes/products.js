import express from "express";

import {
  getProducts,
  getBiddableProducts,
} from "../controllers/user/products.js";
import adminRoutes from './admin/products.js';

const router = express.Router();

router
  .route("/")
  .get(getProducts);

router.get("/bids", getBiddableProducts);
router.use('/admin', adminRoutes);


export default router;

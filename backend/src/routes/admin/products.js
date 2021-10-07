import express from "express";

import { upload } from "../../middlewares/productupload.js";
import { validate } from "../../middlewares/validator/index.js";
import { adminCheck } from '../../middlewares/auth.js';

import {
  createProduct,
  getProducts,
  createProductBidDetails,
  getBidProducts,
  getBiddableProducts,
  deleteProduct,
  updateProduct,
} from "../../controllers/admin/products.js";

const router = express.Router();


router
  .route("/")
  .get(adminCheck, getProducts)
  .post(
    adminCheck,
    upload.single("productimg"),
    validate("createProduct"),
    createProduct
  );

router.post(
  "/bid/create",
  adminCheck,
  validate("createProductBid"),
  createProductBidDetails
);
router.get("/bids/all", adminCheck, getBidProducts);
router.get("/bids", getBiddableProducts);
router.delete("/mod", adminCheck, validate("deleteProduct"), deleteProduct);
router.patch(
  "/mod/update/:id",
  adminCheck,
  upload.single("productimg"),
  validate("updateProduct"),
  updateProduct
);

export default router;

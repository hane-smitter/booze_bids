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

// router.use(adminCheck);

router
  .route("/")
  .get(getProducts)
  .post(
    upload.single("productimg"),
    validate("createProduct"),
    createProduct
  );

router.post(
  "/bid/create",
  validate("createProductBid"),
  createProductBidDetails
);
router.get("/bids/all", getBidProducts);
router.get("/bids", getBiddableProducts);
router.delete("/mod", validate("deleteProduct"), deleteProduct);
router.patch(
  "/mod/update/:id",
  upload.single("productimg"),
  validate("updateProduct"),
  updateProduct
);

export default router;

import express from "express";

import { createCategory, getCategories } from "../controllers/categories.js";
import { validate } from "../middlewares/validator/index.js";

const router = express.Router();

router.route("/")
    .get(getCategories)
    .post(validate("createCategory"), createCategory);

export default router;

import express from "express";

import { createCategory, getCategories, deleteCategory, updateCategory } from "../controllers/categories.js";
import { validate } from "../middlewares/validator/index.js";

const router = express.Router();

router.route("/")
    .get(getCategories)
    .post(validate("createCategory"), createCategory);

router.delete('/mod', validate("deleteCategory"), deleteCategory);
router.patch('/mod/update/:id', validate('updateCategory'), updateCategory);

export default router;

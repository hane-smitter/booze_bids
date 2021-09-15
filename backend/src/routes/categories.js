import express from "express";

import { createCategory, getCategories } from "../controllers/categories.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/create", createCategory);

export default router;

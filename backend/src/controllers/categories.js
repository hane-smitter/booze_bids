import { validationResult } from "express-validator";

import Category from "../models/Category.js";
import makeId from "./utils/makeid/makeid.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
      console.log(error);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

//create category
export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }
  try {
    const newCategory = new Category(req.body);
    let category_slug = `${makeId(4)}T${new Date().valueOf() + Math.floor(Math.random() * 1000)}_${makeId(6)}`;
    newCategory.category_slug = category_slug;
    await newCategory.save();
    console.log('category has been created');
    console.log(newCategory);
    res.json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

import { validationResult } from "express-validator";
import mongoose from 'mongoose';

import Category from "../models/Category.js";
import Product from "../models/Product.js";
import makeId from "./utils/makeid/makeid.js";

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
    let category_slug = `${makeId(4)}T${
      new Date().valueOf() + Math.floor(Math.random() * 1000)
    }_${makeId(6)}`;
    newCategory.category_slug = category_slug;
    await newCategory.save();
    res.json({
      info: {
        message: "New category added!",
        severity: "success",
        code: "createproductcategory",
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

//update category
export const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }
  if (!req.params.id) throw new Error("Must provide id of the category");
  try {
    const allowedUpdates = ["name", "description"];
    const body = req.body;

    const bodyKeys = Object.keys(body);
    const validFields = bodyKeys.filter((bodyKey) =>
      allowedUpdates.includes(bodyKey)
    );

    const isValidId = mongoose.isValidObjectId(req.params.id);
    if(!isValidId) throw new Error("Invalid ID is provided!");

    const category = await Category.findById(req.params.id);
    for (let i = 0; i < validFields.length; i++) {
      category[validFields[i]] = req.body[validFields[i]];
    }

    await category.save();
    res.json({
      info: {
        message: "Category has been updated successfully",
        severity: "success",
        code: "updatecategory",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: [{
      msg: "Could not complete requested operation"
    }] });
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }
  
  try {
    if (!req.body.catId) throw new Error("Must provide id of the category");
    const categoryId = req.body.catId;
    const category = await Category.findById(categoryId);
    if (!category) throw new Error("category not found");
    const catInUse = await Product.findOne({ category: category._id });
    if (catInUse) return res.status(422).json({ err: [{msg: "Consider deleting the items registered under this category first!"}] });

    await Category.findByIdAndDelete(categoryId);
    res.json({
      info: {
        message: "Category has been deleted successfully",
        code: "destroycategory",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: [{
      msg: "Could not complete requested operation"
    }] });
  }
};

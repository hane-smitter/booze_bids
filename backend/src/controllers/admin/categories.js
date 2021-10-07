import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";

import Category from "../../models/Category.js";
import Product from "../../models/Product.js";
import makeId from "../utils/makeid/makeid.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

//create category
export const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ErrorResponse(undefined, 422, errors.array());
    }
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
      },
    });
  } catch (error) {
    next(error);
  }
};

//update category
export const updateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ErrorResponse(undefined, 422, errors.array());
    }
    if (!req.params.id)
      throw new ErrorResponse("Must provide id of the category", 422);
    const allowedUpdates = ["name", "description"];
    const body = req.body;

    const bodyKeys = Object.keys(body);
    const validFields = bodyKeys.filter((bodyKey) =>
      allowedUpdates.includes(bodyKey)
    );

    const isValidId = mongoose.isValidObjectId(req.params.id);
    if (!isValidId) throw new ErrorResponse("Invalid ID is provided", 422);

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
    next(err);
  }
};

//delete category
export const deleteCategory = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new ErrorResponse(undefined, 422, errors.array());
    }
    if (!req.body.catId)
      throw new ErrorResponse("Must provide id of the category", 422);
    const categoryId = req.body.catId;
    const category = await Category.findById(categoryId);
    if (!category) throw new ErrorResponse("category not found", 404);
    const catInUse = await Product.findOne({ category: category._id });
    if (catInUse)
      throw new ErrorResponse(
        "Consider deleting the items registered under this category first",
        400
      );

    await Category.findByIdAndDelete(categoryId);
    res.json({
      info: {
        message: "Category has been deleted successfully",
        code: "destroycategory",
      },
    });
  } catch (err) {
    next(err);
  }
};

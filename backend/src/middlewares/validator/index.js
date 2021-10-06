import { default as validator } from "express-validator";
import { default as mongoose } from "mongoose";
import Category from "../../models/Category.js";

const { body, check } = validator;

export const validate = (method) => {
  switch (method) {
    case "createProduct": {
      return [
        body("name", "provide name of product")
          .escape()
          .trim()
          .exists({ checkFalsy: true }),
        body("brand", "Provide a brand name")
          .escape()
          .trim()
          .exists({ checkFalsy: true }),
        body("cost")
          .trim()
          .exists({ checkFalsy: true })
          .withMessage("Price of the product is required")
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage("Product price is not valid")
          .bail(),
        body("category")
          .trim()
          .exists({ checkFalsy: true }) /* .isIn(['category1', 'category2']) */
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
        body("store").trim().optional(),
      ];
    }
    case "updateProduct": {
      return [
        check("name").optional().isAlpha('en-US', {ignore: ' '}).withMessage("Do not use symbols").trim(),
        body("brand").optional().isAlpha('en-US', {ignore: ' '}).trim(),
        body("cost").optional().isNumeric({ no_symbols: true }).trim(),
        body("category")
          .optional()
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
        body("store").optional().isAlpha('en-US', {ignore: ' '}).trim(),
      ];
    }
    case "createProductBid": {
      return [
        body("product")
          .exists({ checkFalsy: true })
          .withMessage("product id is required")
          .bail()
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
        body("bidPrice")
          .exists({ checkFalsy: true })
          .withMessage("Bid price must be provided")
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage("Bid Price is not valid")
          .bail(),
        body("targetAmount")
          .exists({ checkFalsy: true })
          .withMessage("Target Amount must be provided")
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage("Target Amount is not valid")
          .bail(),
        body("startTime")
          .exists({ checkFalsy: true })
          .withMessage("product bid start time is required")
          .bail(),
        body("endTime")
          .exists({ checkFalsy: true })
          .withMessage("product bid end time is required")
          .bail(),
      ];
    }
    case "createBid": {
      return [
        check("bidder.phone")
          .exists({ checkFalsy: true })
          .withMessage("phone number is required")
          .bail()
          .isNumeric()
          .withMessage("phone number should be numeric")
          .bail(),
        body("bidder.firstname")
          .if(body("bidder.acknowledgeNew").exists({ checkFalsy: true }))
          .notEmpty()
          .withMessage("firstname should be provided")
          .trim()
          .escape(),
        check("bidder.lastname")
          .if(body("bidder.acknowledgeNew").exists({ checkFalsy: true }))
          .notEmpty()
          .withMessage("lastname should be provided")
          .trim()
          .escape(),
        check("bidder.location")
          .if(body("bidder.acknowledgeNew").exists({ checkFalsy: true }))
          .notEmpty()
          .withMessage("location should be provided")
          .trim()
          .escape(),
        check("productId")
          .exists({ checkFalsy: true })
          .withMessage("product is required")
          .bail()
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
        check("bidPrice")
          .exists({ checkFalsy: true })
          .withMessage("Bid price is required")
          .bail()
          .isNumeric()
          .withMessage("Price should be numeric")
          .bail()
          .escape(),
        check("bidAmount")
          .exists({ checkFalsy: true })
          .withMessage("Bid Amount is required")
          .bail()
          .isNumeric()
          .withMessage("Price should be numeric")
          .bail()
          .escape(),
      ];
    }
    case "createCategory": {
      return [
        body("name")
          .exists({ checkFalsy: true })
          .withMessage("category name is required")
          .escape()
          .custom(async (name) => {
            try {
              name = name && name.trim().toLowerCase();
              const exists = await Category.findOne({ name });
              return exists && Promise.reject();
            } catch (err) {
              console.log(err);
              return Promise.reject();
            }
          })
          .withMessage("This category name is already occupied!"),
        body("description").optional({ checkFalsy: true }).escape(),
      ];
    }
    case "deleteCategory": {
      return [
        check("catId")
          .exists({ checkFalsy: true })
          .withMessage("category Id is required")
          .bail()
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
      ];
    }
    case "updateCategory": {
      return [
        body("name")
        .optional()
        .trim()
          .escape(),
        body("description").optional().trim().escape(),
      ];
    }
    case "deleteProduct": {
      return [
        body("productId")
          .exists({ checkFalsy: true })
          .withMessage("Product id is required")
          .bail()
          .custom((value) => {
            return mongoose.isValidObjectId(value);
          })
          .withMessage("Invalid id"),
      ];
    }
  }
};

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
        check("phone")
          .exists({ checkFalsy: true })
          .withMessage("phone number is required")
          .bail()
          .isNumeric()
          .withMessage("phone number should be numeric")
          .bail(),
        body("bidder.surname")
          .if(body("bidder.surname").exists({ checkFalsy: true }))
          .notEmpty()
          .trim()
          .escape(),
        body("bidder.othername")
          .if(body("bidder.othername").exists({ checkFalsy: true }))
          .notEmpty()
          .trim()
          .escape(),
        check("bidder.location")
          .if(body("bidder.location").exists({ checkFalsy: true }))
          .notEmpty()
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
          .custom((async (name) => {
            try {
              name = name && name.trim().toLowerCase();
              const exists = await Category.findOne({ name });
              return exists && Promise.reject();
            } catch (err) {
              console.log(err);
              return Promise.reject();
            }
           
          }))
          .withMessage("This category name is already occupied!"),
        body("description").optional({ checkFalsy: true }).escape(),
      ];
    }
  }
};

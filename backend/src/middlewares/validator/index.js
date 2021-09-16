import { default as validator } from "express-validator";
import { default as mongoose } from "mongoose";

const { body } = validator;

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
          .withMessage('Price of the product is required')
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage('Product price is not valid')
          .bail(),
        body("category")
          .trim()
          .exists({ checkFalsy: true }) /* .isIn(['category1', 'category2']) */
          .custom(value => {
            return mongoose.isValidObjectId(value);
          }).withMessage("Invalid id"),
        body("store")
          .trim()
          .optional(),
      ];
    }
    case "createProductBid": {
      return [
        body("product")
          .exists({ checkFalsy: true })
          .withMessage("product id is required")
          .bail()
          .custom(value => {
            return mongoose.isValidObjectId(value);
          }).withMessage("Invalid id"),
        body("bidPrice")
          .exists({ checkFalsy: true })
          .withMessage('Bid price must be provided')
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage('Bid Price is not valid')
          .bail(),
        body("targetAmount")
          .exists({ checkFalsy: true })
          .withMessage('Target Amount must be provided')
          .bail()
          .isNumeric({ no_symbols: true })
          .withMessage('Target Amount is not valid')
          .bail(),
        body("startTime")
          .exists({ checkFalsy: true })
          .withMessage("product bid start time is required")
          .bail(),
        body("endTime")
          .exists({ checkFalsy: true })
          .withMessage("product bid end time is required")
          .bail()
      ]
    }
    case "createBid": {
      return [
        body("phone")
          .exists({ checkFalsy: true })
          .withMessage("phone number is required")
          .isNumeric(),
        body("productId")
          .exists({ checkFalsy: true })
          .custom(value => {
            return mongoose.isValidObjectId(value);
          }).withMessage("Invalid id"),
        body("bidPrice")
          .exists({ checkFalsy: true })
          .withMessage('Bid price is required')
          .escape(),
        body("bidAmount")
          .exists({ checkFalsy: true })
          .withMessage('Bid Amount is required')
          .escape()
      ]
    }
    case "createCategory": {
      return [
        body("name")
          .exists({ checkFalsy: true })
          .withMessage("category name is required")
          .escape(),
        body("description")
          .optional({checkFalsy: true})
          .escape(),
      ]
    }
  }
};

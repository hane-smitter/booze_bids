import { body } from "express-validator";

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
          .isNumeric({ no_symbols: true })
          .exists({ checkFalsy: true }),
        body("category")
          .trim()
          .optional() /* .isIn(['category1', 'category2']) */,
        body("store")
          .trim()
          .optional(),
      ];
    }
  }
};

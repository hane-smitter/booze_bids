import fs from "fs";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Product from "../../models/Product.js";
import ProductBidDetail from "../../models/ProductBidDetail.js";
import Category from "../../models/Category.js";
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .sort([["createdAt", -1]])
      .populate(["productbids", "productbidscount","category"]);
    /* .exec(function(error, bids) {
            if(error) throw error;
            console.log('here is the bids meen!!');
            console.log(bids.productbids);
        }); */
    res.json(products);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getBiddableProducts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;

    const LIMIT = 40;
    const startIndex = (parseInt(page) - 1) * LIMIT; //get starting index of every page
    const total = await ProductBidDetail.countDocuments({
      endTime: { $gt: new Date().toISOString() },
      status: "Active",
    });

    const match = new Object();
    if (req.query.category) {
      let category = req.query.category;
      match.category_slug = category;
    }
    if (req.query.search) {
      const search = new RegExp(req.query.search, "i");
      match.name = search;
      const biddableProducts = await ProductBidDetail.find({
        endTime: { $gt: new Date().toISOString() },
        status: "Active"
      })
        .populate({
          path: "product",
          match,
        })
        .sort([["endTime", 1]])
        .limit(LIMIT)
        .skip(startIndex);
        res.json({
          data: biddableProducts,
          currentPage: Number(page),
          numberOfPages: Math.ceil(total / LIMIT),
        });
    } else {
      const biddableProducts = await ProductBidDetail.find({
        endTime: { $gt: new Date().toISOString() },
        status: "Active",
      })
        .populate({
          path: "product",
          match,
        })
        .sort([["endTime", 1]])
        .limit(LIMIT)
        .skip(startIndex);
      res.json({
        data: biddableProducts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
      // const biddableProducts = await ProductBidDetail.find({
      //   endTime: { $gt: new Date().toISOString() },
      //   status: "Active",
      // })
      //   .populate({
      //     path: "product",
      //     match,
      //   })
      //   .sort([["endTime", 1]]);
    }

    // res.json(biddableProducts);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  let fileErr = [];
  if (!req.file) {
    fileErr.push({
      value: "",
      msg: "Please upload a file",
      param: "productimg",
      location: "body",
    });
  }

  try {
    if (!errors.isEmpty() || !req.file) {
      let errorsBag = [...errors.array(), ...(fileErr || [])];
      throw new ErrorResponse(undefined, 422, errorsBag);
    }

    const URL = process.env.APP_URL ?? "http://localhost:5000";
    const filePath = `${URL}/imgs/products/${req.file.filename}`;
    const category = await Category.findById(req.body.category);
    if (!category) throw new ErrorResponse("This Category does not exist", 404);

    let product = new Product({
      ...req.body,
      image: filePath,
      category: category._id,
      category_slug: category.category_slug,
    });
    await product.save();
    res.status(201).json({
      info: {
        message: "Item added successfully!",
        severity: "success",
        code: "createproduct",
      },
    });
  } catch (err) {
    req.file &&
      fs.unlink(`${req.file.destination}/${req.file.filename}`, (error) => {
        if (error) throw error;
        console.log("Uploaded file deleted successfully!");
      });
    next(err);
  }
};

export const getBidProducts = async (req, res, next) => {
  try {
    const productBids = await ProductBidDetail.find().populate("product");
    res.json(productBids);
  } catch (err) {
    next(err);
  }
};

export const createProductBidDetails = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      let errorsBag = errors.array();
      throw new ErrorResponse(undefined, 422, errorsBag);
    }

    const bidDetails = new ProductBidDetail(req.body);
    /* console.log('bid product');
        console.log(bidDetails); */
    await bidDetails.save();
    res.status(201).json({
      info: {
        message: "Bid details for the product is created successfully",
        severity: "success",
        code: "createproductbiddetails",
      },
    });
  } catch (err) {
    next(err);
  }
};

//delete product
export const deleteProduct = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      let errorsBag = errors.array();
      throw new ErrorResponse(undefined, 422, errorsBag);
    }

    const productId = req.body.productId;
    if (!productId) throw new ErrorResponse("Provide the product ID", 400);
    const product = await Product.findOneAndDelete({
      _id: mongoose.Types.ObjectId(productId),
    });
    if (!product) throw new ErrorResponse("Product not found", 404);
    const imageUrl = product.image;
    let capturingRegex = /\/(?<img>[a-zA-Z0-9]+[_]\d+\.(jpe?g|png))$/;
    const { groups } = imageUrl.match(capturingRegex);
    const imageName = groups.img;
    if (imageName) {
      fs.unlink(`public/imgs/products/${imageName}`, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("file deleted successfully");
        }
      });
    }
    res.json({
      info: {
        message: "Product has been deleted successfully",
        severity: "success",
        code: "deleteproduct",
      },
    });
  } catch (err) {
    next(err);
  }
};

//update product
export const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      let errorsBag = errors.array();
      throw new ErrorResponse(undefined, 422, errorsBag);
    }
    if (!req.params.id)
      throw new ErrorResponse("Must provide id of the category", 400);
    const allowedUpdates = ["name", "brand", "image", "cost", "category"];
    const body = req.body;

    const bodyKeys = Object.keys(body);
    const validFields = bodyKeys.filter((bodyKey) =>
      allowedUpdates.includes(bodyKey)
    );

    const isValidId = mongoose.isValidObjectId(req.params.id);
    if (!isValidId) throw new ErrorResponse("Invalid ID is provided", 400);

    const product = await Product.findById(req.params.id);
    for (let i = 0; i < validFields.length; i++) {
      product[validFields[i]] = req.body[validFields[i]];
    }

    if (req.file) {
      const URL = process.env.APP_URL ?? "http://localhost:5000";
      const filePath = `${URL}/imgs/products/${req.file.filename}`;
      const imageUrl = product.image;
      let capturingRegex = /\/(?<img>[a-zA-Z0-9]+[_]\d+\.(jpe?g|png))$/;
      const { groups } = imageUrl.match(capturingRegex);
      const imageName = groups.img;
      if (imageName) {
        fs.unlink(`public/imgs/products/${imageName}`, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("file deleted successfully");
          }
        });
      }
      product.image = filePath;
    }

    await product.save();

    res.json({
      info: {
        message: "Product has been updated successfully!",
        severity: "success",
        code: "updateproduct",
      },
    });
  } catch (err) {
    next(err);
  }
};

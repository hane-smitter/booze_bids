import fs from "fs";
import { validationResult } from "express-validator";
import mongoose from 'mongoose';

import Product from "../models/Product.js";
import ProductBidDetail from "../models/ProductBidDetail.js";
import Category from "../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort([["createdAt", -1]])
      .populate(["productbids", "productbidscount"]);
    /* .exec(function(error, bids) {
            if(error) throw error;
            console.log('here is the bids meen!!');
            console.log(bids.productbids);
        }); */
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

export const getBiddableProducts = async (req, res) => {
  try {
    const match = new Object();
    if (req.query.category) {
      let category = req.query.category;
      match.category_slug = category;
    }
    const biddableProducts = await ProductBidDetail.find({
      endTime: { $gt: new Date().toISOString() },
      status: "Active",
    })
      .populate({
        path: "product",
        match,
      })
      .sort([["endTime", 1]]);
    res.json(biddableProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

export const createProduct = async (req, res) => {
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

  if (!errors.isEmpty() || !req.file) {
    res
      .status(422)
      .json({ err: [...(errors.array() || []), ...(fileErr || [])] });
    return;
  }

  const URL = process.env.APP_URL ?? "http://localhost:5000";
  const filePath = `${URL}/imgs/products/${req.file.filename}`;
  try {
    const category = await Category.findById(req.body.category);
    if (!category) throw new Error("This Category does not exist");

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
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};

export const getBidProducts = async (req, res) => {
  try {
    const productBids = await ProductBidDetail.find().populate("product");
    res.json(productBids);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: [{ error: "Server is temporarily down!" }] });
  }
};

export const createProductBidDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: errors.array() });
    return;
  }
  try {
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
    console.log(err);
    res.status(400).json({ err: [{ msg: err.message }] });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: errors.array() });
    return;
  }
  try {
    const productId = req.body.productId;
    if(!productId) throw new Error("Provide the product ID");
    const product = await Product.findOneAndDelete({_id: mongoose.Types.ObjectId(productId)});
    if(!product) throw new Error("Product not found");
    const imageUrl = product.image;
    let capturingRegex = /\/(?<img>[a-zA-Z0-9]+[_]\d+\.(jpe?g|png))$/;
    const { groups } = imageUrl.match(capturingRegex);
    const imageName = groups.img;
    if(imageName) {
      fs.unlink(`public/imgs/products/${imageName}`, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log('file deleted successfully');
          };
        });
    }
    res.json({
      info: {
        message: "Product has been deleted successfully",
        severity: "success",
        code: "deleteproduct",
      },
    });
  }catch(err) {
    console.log(err);
    res.status(400).json({ err: [ {
      msg: "Could not complete operation!"
     } ] })
  }
}

//update product
export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ err: [...errors.array()] });
    return;
  }
  if (!req.params.id) throw new Error("Must provide id of the category");
  try {
    const allowedUpdates = ["name", "brand", "image", "cost", "category"];
    const body = req.body;

    const bodyKeys = Object.keys(body);
    const validFields = bodyKeys.filter((bodyKey) =>
      allowedUpdates.includes(bodyKey)
    );

    const isValidId = mongoose.isValidObjectId(req.params.id);
    if(!isValidId) throw new Error("Invalid ID is provided!");

    const product = await Product.findById(req.params.id);
    for (let i = 0; i < validFields.length; i++) {
      product[validFields[i]] = req.body[validFields[i]];
    }

    if(req.file) {
      const URL = process.env.APP_URL ?? "http://localhost:5000";
      const filePath = `${URL}/imgs/products/${req.file.filename}`;
      const imageUrl = product.image;
      let capturingRegex = /\/(?<img>[a-zA-Z0-9]+[_]\d+\.(jpe?g|png))$/;
      const { groups } = imageUrl.match(capturingRegex);
      const imageName = groups.img;
      if(imageName) {
        fs.unlink(`public/imgs/products/${imageName}`, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log('file deleted successfully');
          };
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
    console.log(err);
    res.status(400).json({ err: [{
      msg: err.message
    }] });
  }
}

import ErrorResponse from "../../_helpers/error/ErrorResponse.js";
import Product from "../../models/Product.js";
import Bid from "../../models/Bid.js";
import User from "../../models/User.js";
import { sendEmail } from "../utils/sendMail/sendMail.js";
import ProductBidDetail from "../../models/ProductBidDetail.js";

//get dash data
export const getDashboardData = async (req, res, next) => {
    try {
        let productsNo = await getProductsCount();
        let customersNo = await getCustomersCount();
        let bidsNo = await getBidsCount();
        let profit = '234567'//await getProfits();
        let latest_products = await getLatestProducts();
        let latest_bids = await getLatestBids();
        let dashData = {
            "products_count": productsNo, 
            "customers_count": customersNo, 
            "active_bids_count": bidsNo, 
            "profit":profit,
            "latest_products": latest_products,
            "latest_bids": latest_bids
        }
        res.status(200).json(dashData);
    } catch (error) {
        res.status(200).json(error);
    }
}
function getProductsCount() {
  try {
    const product = Product.countDocuments({});
    return product;
  } catch (err) {
    next(err);
  }
};

function getCustomersCount() {
    try {
      const customer = User.countDocuments({});
      return customer;
    } catch (err) {
      next(err);
    }
  };

  function getBidsCount() {
    try {
      const bids = Bid.countDocuments({'status':'Active'});
      return bids;
    } catch (err) {
      next(err);
    }
  };

  function getProfits() {
    try {
      const profits = Bid.aggregate(
          "bidAmountTotal"
      );
      return profits;
    } catch (err) {
      next(err);
    }
  };
  function getLatestBids() {
    try {
      const bids = Bid.find({})
      .populate(['user','product'])
      .sort([["_id", -1]])
      .limit(6);
      return bids;
    } catch (err) {
      next(err);
    }
  };
  function getLatestProducts() {
    try {
      const products = Product.find({})
      .sort([["createdAt", -1]])
      .limit(5);
      return products;
    } catch (err) {
      next(err);
    }
  };
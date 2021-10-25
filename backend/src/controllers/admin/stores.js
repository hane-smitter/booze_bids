import Store from "../../models/store.js";
import Product from "../../models/Product.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import ErrorResponse from "../../_helpers/error/ErrorResponse.js";

//get
export const getStores = async (req, res, next) => {
    try {
        const stores = await Store.find({}).sort([[["createdAt", -1]]]);
        res.status(200).json(stores)
    } catch (error) {
        next(error)
    }
}
//add
export const createStore = async (req, res, next) => {
    try {
        const store = new Store({
            name: '', 
            type: '', 
            contact: '',
            mpesaType: '',
            mpesaAccountNo: '',
            mpesaNumber: '',
            location: '', 
            latitude: '', 
            longitude: '', 
            description: '', 
        });
        await store.save();
        res.status(200).json('success');
    } catch (error) {
        next(error)
    }
}

//edit
export const updateStore = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw new ErrorResponse(undefined, 422, errors.array());
          }
          if (!req.params.id)
            throw new ErrorResponse("Select store to delete first", 422);
          const allowedUpdates = [
              "name", "type", "contact", "mpesaType", "mpesaAccountNo", "mpesaNumber", "location", "latitude", "longitude", "description"
            ];
          const body = req.body;
      
          const bodyKeys = Object.keys(body);
          const validFields = bodyKeys.filter((bodyKey) =>
            allowedUpdates.includes(bodyKey)
          );
      
          const isValidId = mongoose.isValidObjectId(req.params.id);
          if (!isValidId) throw new ErrorResponse("Invalid Store values provided", 422);
      
          const store = await Store.findById(req.params.id);
          for (let i = 0; i < validFields.length; i++) {
            store[validFields[i]] = req.body[validFields[i]];
          }
      
          await store.save();
          res.json({
            info: {
              message: "Store has been updated successfully",
              severity: "success",
              code: "updatestore",
            },
          });
    } catch (error) {
        next(error)
    }
}
//delete
export const deleteStore = async (req, res, next) => {
    const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new ErrorResponse(undefined, 422, errors.array());
    }
    if (!req.body.storeIds)
      throw new ErrorResponse("Failed! Select again and delete", 422);
    
    const storeIdsLength = req.body.storeIds.length;
    const storeIds = req.body.storeIds;
    const i = 0;
    for(i == 0; i < storeIdsLength; i++){
      const storeId = storeIds[i];
      const store = await Store.findById(storeIds[i]);
      if (!store) throw new ErrorResponse("store not found", 404);
      const storeInUse = await Product.findOne({ store: store._id });
      if (storeInUse)
        throw new ErrorResponse(
          "Consider deleting the products registered under this store first",
          400
        );

      await Store.findByIdAndDelete(storeIds[i]);
    }

    res.json({
      info: {
        message: "Store(s) has been deleted successfully",
        code: "destroystore",
      },
    });
  } catch (err) {
    next(err);
  }
}
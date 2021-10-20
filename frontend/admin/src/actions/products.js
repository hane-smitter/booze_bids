import { batch } from "react-redux";

import * as api from "../api";
import {
  CREATE,
  READALLPROD,
  READBIDDABLEPROD,
  READUNBIDDABLEPROD,
  READCAT,
  READADMIN,
  CREATECAT,
  ERROR,
  LOADING,
  CREATEBID,
  STATUS,
  READBIDS
} from "../constants";

//Action creators
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch data
    const [productsData, categoriesData] = await Promise.all([
      api.fetchBidProducts(),
      api.fetchProductCategories(),
    ]);
    const { data: products } = productsData;
    const { data: categories } = categoriesData;

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READALLPROD, payload: { products } });
      dispatch({ type: READCAT, payload: { categories } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const getBiddableProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch data
    const { data:products } = await api.fetchBiddableProducts();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READBIDDABLEPROD, payload: { products } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
}
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch categories
    const { data: categories } = await api.fetchProductCategories();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READCAT, payload: { categories } });
    });
  } catch (err) {
    logError(err, dispatch);
  }
};
//admins
export const getAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch admins
    const { data: admins } = await api.fetchAdmins();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READADMIN, payload: { admins } });
    });
  } catch (err) {
    logError(err, dispatch);
  }
};

export const createProduct = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create product
    const { data:status } = await api.createProduct(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({
        type: STATUS,
        payload: { status },
      });
      // dispatch({ type: CREATE, payload: { product: data } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const updateProduct = (param, body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create product
    const { data:status } = await api.updateProduct(param, body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({
        type: STATUS,
        payload: { status },
      });
    });
  } catch (err) {
    logError(err, dispatch);
  }
}

export const createProductBid = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create product bid
    const { data:status } = await api.createProductBid(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({
        type: STATUS,
        payload: { status },
      });
      // dispatch({ type: CREATEBID, payload: { productBid: data } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};

export const createProductCategory = (body) => async (dispatch) => {
  //createProductCategory
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create product cat
    const { data:status } = await api.createProductCategory(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: { status } });
      // dispatch({ type: CREATECAT, payload: { category: data } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};

export const updateProductCategory = (param, body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //update product category
    const { data:status } = await api.updateProductCategory(param, body);
    await api.fetchProductCategories();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: { status } })
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
// deleteCategories
export const deleteProductCategory = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //update product category
    const { data:status } = await api.deleteProductCategory(body);
    await api.fetchProductCategories();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: { status } })
    });
  } catch (error) {
    logError(error, dispatch);
  }
};

export const getBids = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch bids made by customers
    const { data:bids } = await api.fetchBids();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READBIDS, payload: { bids } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
}
//expired bids
export const getExpiredBids = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch bids made by customers
    const { data:bids } = await api.fetchExpiredBids();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READBIDS, payload: { bids } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
}

function logError(error, dispatch) {
  if (error.response) {
    const { err } = error.response.data;
    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: ERROR, payload: { err } });
    });
  } else if (error.request) {
    let err = [
      {
        msg: "Could not contact remote address",
        hint: "Try checking your internet connection and try again"
      },
    ];

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: ERROR, payload: { err } });
    });
  } else {
    let err = [
      {
        msg: "An unknown error occured",
      },
    ];

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: ERROR, payload: { err } });
    });
  }
}

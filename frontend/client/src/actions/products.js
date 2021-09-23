import { batch } from "react-redux";

import * as api from "../api";
import {
  CREATE,
  READPROD,
  UPDATE,
  READCAT,
  ERROR,
  LOADING,
  STATUS,
  FETCHTB
} from "../constants";

//Action creators
export const getProducts = (query) => async (dispatch) => {
  if (query) {
    query = "?" + query;
  } else {
    query = "";
  }
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch data
    const [productsData, categoriesData] = await Promise.all([
      api.fetchBiddableProducts(query),
      api.fetchProductCategories(),
    ]);
    const { data: products } = productsData;
    const { data: categories } = categoriesData;

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: READPROD, payload: { products } });
      dispatch({ type: READCAT, payload: { categories } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const createProduct = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create product
    const { data } = await api.createProduct(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: CREATE, payload: { product: data } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const makeBid = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //make a product bid
    const response = await api.makeBid(body);
    if (response.status == 202) {
      dispatch({ type: STATUS, payload: { status: response.data } });
    }
    dispatch({ type: LOADING, payload: { status: 0 } });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const fetchTopBidder = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //fetch top bidder
    const { data } = await api.fetchTopBidder();

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: FETCHTB, payload: { bidder: data } });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};

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
        msg: "Could not get response",
      },
    ];

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: ERROR, payload: { err } });
    });
  } else {
    let err = [
      {
        msg: "Oops! An unknown error occured!",
      },
    ];

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: ERROR, payload: { err } });
    });
  }
}

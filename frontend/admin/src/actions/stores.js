import { batch } from "react-redux";

import * as api from "../api";
import {
  CREATE,
  READSTORES,
  ERROR,
  LOADING,
  STATUS,
  LOGOUT
} from "../constants";
//store
export const getStores = () => async (dispatch) => {
    try {
      dispatch({ type: LOADING, payload: { status: 1 } });
      //fetch bids made by customers
      const { data:stores } = await api.fetchStores();
  
      batch(() => {
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: READSTORES, payload: { stores } });
      });
    } catch (error) {
      logError(error, dispatch);
    }
}


export const createStore = (body) => async (dispatch) => {
    //createStore
    try {
      dispatch({ type: LOADING, payload: { status: 1 } });
      //create product cat
      const { data: status } = await api.createStore(body);
  
      batch(() => {
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: STATUS, payload: { status } });
        // dispatch({ type: CREATECAT, payload: { category: data } });
      });
    } catch (error) {
      logError(error, dispatch);
    }
  };
  
  export const updateStore = (param, body) => async (dispatch) => {
    try {
      dispatch({ type: LOADING, payload: { status: 1 } });
      //update product category
      const { data: status } = await api.updateStore(param, body);
      await api.fetchStores();
  
      batch(() => {
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: STATUS, payload: { status } });
      });
    } catch (error) {
      logError(error, dispatch);
    }
  };
  // deleteCategories
  export const deleteStore = (body) => async (dispatch) => {
    try {
      dispatch({ type: LOADING, payload: { status: 1 } });
      //update product category
      const { data: status } = await api.deleteStore(body);
      await api.fetchStores();
  
      batch(() => {
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: STATUS, payload: { status } });
      });
    } catch (error) {
      logError(error, dispatch);
    }
  };

  
function logError(error, dispatch) {
    if (error.response) {
        const { err } = error.response.data;
        if (error.response.status == 401) {
        dispatch({ type: LOGOUT });
        }
        batch(() => {
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
        });
    } else if (error.request) {
        console.log(error);
        let err = [
        {
            msg: "Could not contact remote address",
            hint: "Try checking your internet connection and try again",
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
  
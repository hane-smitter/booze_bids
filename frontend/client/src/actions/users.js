import { batch } from "react-redux";

import * as api from "../api";
import {
  CREATE,
  READUSER,
  UPDATE,
  ERROR,
  LOADING,
  STATUS,
  FETCHTUSER
} from "../constants";

//Action creators
export const createUser = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });
    //create user
    const { data, status } = await api.createUser(body);
    
    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } })
      dispatch({ type: STATUS, payload: { info: {
        message: "Success! User registered.",
        severity: "success",
        code: "createUser"
      } } });
      dispatch({ type: CREATE, payload: { user: data } });
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
    console.error(error);
    console.log(error.message);
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

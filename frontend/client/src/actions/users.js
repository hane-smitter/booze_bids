import { batch } from "react-redux";
import { Router } from "react-router-dom";

import * as api from "../api";
import {
  CREATEUSER,
  ERRORUSER,
  LOADINGUSER,
  STATUSUSER,
  AUTH
} from "../constants";

//Action creators
export const createUser = (body, router) => async (dispatch) => {
  try {
    dispatch({ type: LOADINGUSER, payload: { status: 1 } });
    //create user
    const { data, status } = await api.createUser(body);
    
    batch(() => {
      dispatch({ type: LOADINGUSER, payload: { status: 0 } })
      dispatch({ type: STATUSUSER, payload: { info: {
        message: "Success! User registered.",
        severity: "success",
        code: "createUser"
      } } });
      dispatch({ type: AUTH, payload: { user: data } });
      router.push('/');
    });
  } catch (error) {
    logError(error, dispatch);
  }
};

// loginUser
export const loginUser = (body, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(body);
    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    logError(error, dispatch);
  }
};

//send otp
export const sendOtp = (body) => async(dispatch) => {
  try {
    const { data, status } = await api.sendOtp(body);
    batch(() => {
      dispatch({ type: LOADINGUSER, payload: { status: 0 } })
      dispatch({ type: STATUSUSER, payload: { info: {
        message: "Success! Otp sent.",
        severity: "success",
        code: "sendOtp"
      } } });
    });
    dispatch({ type: AUTH, data });
  }
  catch (error) {
    logError(error, dispatch)
  }
}

function logError(error, dispatch) {
  if (error.response) {
    const { err } = error.response.data;
    batch(() => {
      dispatch({ type: LOADINGUSER, payload: { status: 0 } });
      dispatch({ type: ERRORUSER, payload: { err } });
    });
  } else if (error.request) {
    let err = [
      {
        msg: "Could not get response",
      },
    ];

    batch(() => {
      dispatch({ type: LOADINGUSER, payload: { status: 0 } });
      dispatch({ type: ERRORUSER, payload: { err } });
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
      dispatch({ type: LOADINGUSER, payload: { status: 0 } });
      dispatch({ type: ERRORUSER, payload: { err } });
    });
  }
}

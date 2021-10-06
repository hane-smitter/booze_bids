import { batch } from "react-redux";

import * as api from "../api";
import { ERROR, LOADING, STATUS } from "../constants";

export const register = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });

    const { data: status } = await api.register(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: status });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const registerAdmin = (body) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });

    const { data: status } = await api.registerAdmin(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: status });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const login = body => async dispatch => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });

    const { data: status } = await api.login(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: status });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const forgotPassword = body => async dispatch => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });

    const { data: status } = await api.forgotPassword(body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: status });
    });
  } catch (error) {
    logError(error, dispatch);
  }
};
export const resetPassword = (params, body) => async dispatch => {
  try {
    dispatch({ type: LOADING, payload: { status: 1 } });

    const { data: status } = await api.resetPassword(params, body);

    batch(() => {
      dispatch({ type: LOADING, payload: { status: 0 } });
      dispatch({ type: STATUS, payload: status });
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

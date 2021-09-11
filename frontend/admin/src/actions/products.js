import * as api from '../api';
import { CREATE, READ, UPDATE, DELETE, ERROR, LOADING, CREATEBID } from "../actionTypes";

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //fetch data
        const { data, status } = await api.fetchBidProducts();

        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: READ, payload: { products: data } });
    } catch (error) {
        console.log(error);
        const { err } = error?.response?.data ?? {err: []};
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
    }

}
export const createProduct = (body) => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //create product
        const { data } = await api.createProduct(body);

        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: CREATE, payload: { product: data }});
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
    }
}

export const createProductBid = body => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //create product bid
        const { data } = await api.createProductBid(body);

        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: CREATEBID, payload: { productBid: data }});
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
    }
}
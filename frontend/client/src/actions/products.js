import * as api from '../api';
import { CREATE, READ, UPDATE, DELETE, ERROR, LOADING } from "../actionTypes";

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //fetch data
        const { data } = await api.fetchBiddableProducts();

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
export const makeBid = body => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //make a product bid
        const { data } = await api.makeBid(body);
        dispatch({ type: LOADING, payload: { status: 0 } });
    } catch (error) {
        const { err } = error?.response?.data || {err: []};
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
    }
}
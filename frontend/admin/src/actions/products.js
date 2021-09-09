import * as api from '../api';
import { CREATE, READ, UPDATE, DELETE, ERROR, LOADING } from "../actionTypes";

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //fetch data
        const { data, status } = await api.fetchBidProducts();

        dispatch({ type: LOADING, payload: { status: 0 } });
        const action = { type: READ, payload: { products: data } }
        dispatch(action);
    } catch (error) {
        console.log(error);
        const { err } = error?.response?.data ?? {err: []};
        dispatch({ type: LOADING, payload: { status: 0 } });
        dispatch({ type: ERROR, payload: { err } });
    }

}
export const createProduct = (body) => async(dispatch) => {
    try {
        //create product
        const { data } = await api.createProduct(body);
        dispatch({ type: CREATE, payload: { product: data }});
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};
        dispatch({ type: ERROR, payload: { err } });
    }
}
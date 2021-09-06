import * as api from '../api';
import { CREATE, READ, UPDATE, DELETE, LIKE } from "../actionTypes";

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        //fetch data
        const { data } = await api.fetchBidProducts();

        const action = { type: READ, payload: { products: data } }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }

}
export const createProduct = (body) => async(dispatch) => {
    try {
        //create product
        const { data } = await api.createProduct(body);
        dispatch({ type: CREATE, payload: { product: data }});
    } catch (error) {
        console.log(error);
    }
}
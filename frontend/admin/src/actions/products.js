import { batch } from 'react-redux';

import * as api from '../api';
import { CREATE, READPROD, READCAT, CREATECAT, ERROR, LOADING, CREATEBID } from "../constants";

//Action creators
export const getProducts = () => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //fetch data
       const [ productsData, categoriesData ] = await Promise.all([api.fetchBidProducts(), api.fetchProductCategories()]);
       const { data:products } = productsData;
       const { data:categories } = categoriesData;

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: READPROD, payload: { products } });
            dispatch({ type: READCAT, payload: { categories } });
        });
    } catch (error) {
        console.log(error);
        const { err } = error?.response?.data ?? {err: []};

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: ERROR, payload: { err } });
        });
    }

}
export const createProduct = (body) => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //create product
        const { data } = await api.createProduct(body);

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: CREATE, payload: { product: data }});
        })
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: ERROR, payload: { err } });
        });
    }
}

export const createProductBid = body => async(dispatch) => {
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //create product bid
        const { data } = await api.createProductBid(body);

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: CREATEBID, payload: { productBid: data }});
        });
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: ERROR, payload: { err } });
        });
    }
}

export const createProductCategory = body => async(dispatch) => {
    //createProductCategory
    try {
        dispatch({ type: LOADING, payload: { status: 1 } });
        //create product bid
        const { data } = await api.createProductCategory(body);

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: CREATECAT, payload: { category: data }});
        });
    } catch (error) {
        const { err } = error?.response?.data ?? {err: []};

        batch(() => {
            dispatch({ type: LOADING, payload: { status: 0 } });
            dispatch({ type: ERROR, payload: { err } });
        });
    }
}
import axios from 'axios';
import elevateAxios from './axiosConfig';

const url = 'http://127.0.0.1:5000';
axios.defaults.baseURL = url;

export const fetchBidProducts = () => axios.get(`/products`);
export const fetchBiddableProducts = () => axios.get(`/products/bids`);
export const createProduct = (body) => axios.post(`/products`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
export const updateProduct = (param, body) => axios.patch(`/products/mod/update/${param}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const createProductBid = body => axios.post(`/products/bid/create`, body);
export const fetchProductCategories = () => axios.get(`/categories`);
export const createProductCategory = body => axios.post(`/categories`, body);
export const updateProductCategory = (param, body) => axios.patch(`/categories/mod/update/${param}`, body);
export const fetchBids = () => axios.get(`/bids`);

export const register = body => axios.post(`/auth/signup`, body);
export const registerAdmin = body => axios.post(`/auth/admin/create`, body);
export const login = body => axios.post(`/auth/signin`, body);
export const logout = body => elevateAxios.post(`/auth/logout`, body);
export const forgotPassword = body => axios.post(`/auth/forgotpassword`, body);
export const resetPassword = (param, body) => axios.patch(`/auth/resetpassword/${param}`, body);
import axios from 'axios';
import elevateAxios from './axiosConfig';

const url = 'http://localhost:5000';
axios.defaults.baseURL = url;

export const fetchBidProducts = () => axios.get(`/products`);
export const fetchBiddableProducts = () => axios.get(`/products/admin/bids`);
export const createProduct = (body) => elevateAxios.post(`/products/admin`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
export const updateProduct = (param, body) => elevateAxios.patch(`/products/admin/mod/update/${param}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const createProductBid = body => elevateAxios.post(`/products/admin/bid/create`, body);
export const fetchProductCategories = () => axios.get(`/categories`);
export const createProductCategory = body => elevateAxios.post(`/categories/admin`, body);
export const updateProductCategory = (param, body) => elevateAxios.patch(`/categories/admin/mod/update/${param}`, body);
export const fetchBids = () => elevateAxios.get(`/bids/admin`);
export const fetchExpiredBids = () => elevateAxios.get(`/bids/admin/expired`);

export const register = body => axios.post(`/auth/admin/signup`, body);
export const fetchAdmins = () => elevateAxios.get(`/auth/admin/`);
export const registerAdmin = body => elevateAxios.post(`/auth/admin/create`, body);
export const login = body => axios.post(`/auth/admin/signin`, body);
export const logout = body => elevateAxios.post(`/auth/admin/logout`, body);
export const forgotPassword = body => axios.post(`/auth/admin/forgotpassword`, body);
export const resetPassword = (param, body) => axios.patch(`/auth/admin/resetpassword/${param}`, body);
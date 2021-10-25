import axios from 'axios';
import elevateAxios from './axiosConfig';

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
export const createProductCategory = body => elevateAxios.post(`/categories/admin`, body);//elevateAxios to be returned
export const updateProductCategory = (param, body) => elevateAxios.patch(`/categories/admin/mod/update/${param}`, body);//elevateAxios to be returned
export const deleteProductCategory = (body) => elevateAxios.delete(`/categories/admin/mod`, body);//elevateAxios to be returned
export const fetchProductBidWinners = () => elevateAxios.get(`/bids/admin/winners`);

export const fetchBids = () => elevateAxios.get(`/bids/admin`);
export const fetchExpiredBids = () => elevateAxios.get(`/bids/admin/expired`);

export const register = body => axios.post(`/auth/admin/signup`, body);
export const fetchAdmins = () => elevateAxios.get(`/auth/admin/`);
export const registerAdmin = (body) => elevateAxios.post(`/auth/admin/create`, body);
export const login = body => axios.post(`/auth/admin/signin`, body);
export const logout = body => elevateAxios.post(`/auth/admin/logout`, body);
export const forgotPassword = body => axios.post(`/auth/admin/forgotpassword`, body);
export const resetPassword = (param, body) => axios.patch(`/auth/admin/resetpassword/${param}`, body);

export const getDashboardData = () => elevateAxios.get(`/auth/admin/dashboard-data`);
//store
export const fetchStores = () => elevateAxios.get(`/stores/admin`);
export const createStore = (body) => elevateAxios.post(`/stores/admin/create`, body);
export const updateStore = (param, body) => elevateAxios.patch(`/stores/admin/update/${param}`, body);
export const deleteStore = (param, body) => elevateAxios.patch(`/stores/admin/delete/${param}`, body);
import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchBidProducts = () => axios.get(`${url}/products`);
export const fetchBiddableProducts = () => axios.get(`${url}/products/bids`);
export const createProduct = (body) => axios.post(`${url}/products`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
export const updateProduct = (param, body) => axios.patch(`${url}/products/mod/update/${param}`, body, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});
export const createProductBid = body => axios.post(`${url}/products/bid/create`, body);
export const fetchProductCategories = () => axios.get(`${url}/categories`);
export const createProductCategory = body => axios.post(`${url}/categories`, body);
export const updateProductCategory = (param, body) => axios.patch(`${url}/categories/mod/update/${param}`, body);
export const fetchBids = () => axios.get(`${url}/bids`);

export const register = body => axios.post(`${url}/auth/signup`, body);
export const registerAdmin = body => axios.post(`${url}/auth/admin/create`, body);
export const login = body => axios.post(`${url}/auth/signin`, body);
//logout
export const forgotPassword = body => axios.post(`${url}/auth/forgotpassword`, body)
export const resetPassword = (param, body) => axios.patch(`${url}/auth/resetpassword/${param}, ${body}`);
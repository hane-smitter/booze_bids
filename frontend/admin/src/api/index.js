import axios from 'axios';

const url = 'http://api.bidspesa.com:5000';

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
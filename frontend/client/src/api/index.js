import axios from 'axios';

const url = 'https://api.bidspesa.com:5000';

export const fetchBiddableProducts = (query) => axios.get(`${url}/products/bids${query}`);
export const fetchProductCategories = () => axios.get(`${url}/categories`);
export const createProduct = (body) => axios.post(`${url}/products`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
export const makeBid = body => axios.post(`${url}/bids`, body);
export const fetchTopBidder = () => axios.get(`${url}/bids/amount/high`);
export const fetchLastBidder = () => axios.get(`${url}/bids/last`);
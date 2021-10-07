import axios from 'axios';

const url = 'https://api.bidspesa.com:5000';
const API = axios.create({ baseURL: url });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchBiddableProducts = (query) => API.get(`${url}/products/bids${query}`);
export const fetchProductCategories = () => API.get(`${url}/categories`);
export const createProduct = (body) => API.post(`${url}/products`, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
export const makeBid = body => API.post(`${url}/bids`, body);
export const fetchTopBidder = () => API.get(`${url}/bids/amount/high`);
export const fetchLastBidder = () => API.get(`${url}/bids/last`);

export const createUser = (body) => API.post(`${url}/users/create`, body);
export const signIn = (body) => API.post(`${url}/users/login`, body);
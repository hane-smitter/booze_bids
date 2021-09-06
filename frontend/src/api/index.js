import axios from 'axios';

const url = 'http://localhost:5000/products';

export const fetchBidProducts = () => axios.get(url);
export const createProduct = (body) => axios.post(url, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
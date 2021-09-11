import axios from 'axios';

const url = 'http://localhost:5000/products';

export const fetchBiddableProducts = () => axios.get(`${url}/bids`);
export const createProduct = (body) => axios.post(url, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
});
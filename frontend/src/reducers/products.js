import { CREATE, READ, UPDATE, DELETE } from "../actionTypes";

export default (products = [], action) => {
    switch (action.type) {
        case READ:
            return action.payload.products;
        case CREATE:
            return [...products, action.payload.product];
        default:
            return products;
    }
}
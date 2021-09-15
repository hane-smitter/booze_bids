import { CREATE, READPROD, UPDATE, DELETE, ERROR, LOADING, CREATEBID } from "../actionTypes";

export default (app = { products: [], bidproducts: [], err: [], loading: false}, action) => {
    switch (action.type) {
        /* case READPROD:
            return action.payload.products; */
        case READPROD:
            return {...app, products: action.payload.products};
        case CREATE:
            return {
                ...app,
                products: [action.payload.product, ...app.products]
            };
        case CREATEBID:
            return {
                ...app,
                bidproducts: [action.payload.productBid, ...app.bidproducts]
            }
        case ERROR:
            return {
                ...app,
                err: [...action.payload.err]
            };
        case LOADING:
            return {
                ...app,
                loading: Boolean(action.payload.status)
            };
        default:
            return app;
    }
}
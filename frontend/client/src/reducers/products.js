import { CREATE, READ, UPDATE, DELETE, ERROR, LOADING } from "../actionTypes";

export default (app = { products: [], loading: false, err: []}, action) => {
    switch (action.type) {
        /* case READ:
            return action.payload.products; */
        case READ:
            return {...app, products: action.payload.products};
        case CREATE:
            return {
                ...app,
                products: [...app.products, action.payload.product]
            };
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
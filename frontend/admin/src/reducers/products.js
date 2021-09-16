import {
  CREATE,
  READPROD,
  CREATECAT,
  ERROR,
  LOADING,
  CREATEBID,
  READCAT
} from "../constants";

const initState = {
  products: [],
  categories: [],
  bidproducts: [],
  err: [],
  loading: false,
};

export default (app = initState, action) => {
  switch (action.type) {
    /* case READPROD:
            return action.payload.products; */
    case READPROD:
      return { ...app, products: action.payload.products };
    case CREATE:
      return {
        ...app,
        products: [action.payload.product, ...app.products],
      };//categories
    case READCAT:
      return {
        ...app,
        categories: action.payload.categories,
      };
    case CREATEBID:
      return {
        ...app,
        bidproducts: [action.payload.productBid, ...app.bidproducts],
      };
    case CREATECAT:
      return {
        ...app,
        categories: [action.payload.category, ...app.categories],
      };
    case ERROR:
      return {
        ...app,
        err: [...action.payload.err],
      };
    case LOADING:
      return {
        ...app,
        loading: Boolean(action.payload.status),
      };
    default:
      return app;
  }
};

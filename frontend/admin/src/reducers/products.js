import {
  CREATE,
  READALLPROD,
  READBIDDABLEPROD,
  READUNBIDDABLEPROD,
  CREATECAT,
  ERROR,
  LOADING,
  CREATEBID,
  READCAT,
  STATUS,
} from "../constants";

const initState = {
  products: {
    allprod: [],
    biddableprod: [],
    unbiddableprod: [],
  },
  categories: [],
  bidproducts: [],
  status: {},
  err: [],
  loading: false,
};

export default (app = initState, action) => {
  switch (action.type) {
    case READALLPROD:
      return {
        ...app,
        products: { ...app.products, allprod: action.payload.products },
      };
      case READBIDDABLEPROD:
      return {
        ...app,
        products: { ...app.products, biddableprod: action.payload.products },
      };
      case READUNBIDDABLEPROD:
      return {
        ...app,
        products: { ...app.products, unbiddableprod: action.payload.products },
      };
    case CREATE:
      return {
        ...app,
        products: [action.payload.product, ...app.products],
      };
    //categories
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
    case STATUS:
      return {
        ...app,
        status: action.payload.status,
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

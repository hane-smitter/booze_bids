import {
  CREATE,
  READPROD,
  READCAT,
  UPDATE,
  DELETE,
  ERROR,
  LOADING,
  STATUS,
  FETCHTB,
  FETCHLB,
} from "../constants";

export default (
  app = {
    products: [],
    status: {},
    categories: [],
    bidder: {
      topBidder: {}
    },
    loading: false,
    err: [],
  },
  action
) => {
  switch (action.type) {
    /* case READPROD:
            return action.payload.products; */
    case READPROD:
      return { ...app, 
        products: action.payload.data, 
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
       };
    case CREATE:
      return {
        ...app,
        products: [...app.products, action.payload.product],
      };
    case READCAT:
      return {
        ...app,
        categories: action.payload.categories,
      };
    case FETCHTB:
      return {
        ...app,
        bidder: { ...app.bidder, topBidder: action.payload.bidder },
      };
    case FETCHLB:
      return {
        ...app,
        bidder: { ...app.bidder, lastBidder: action.payload.bidder },
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

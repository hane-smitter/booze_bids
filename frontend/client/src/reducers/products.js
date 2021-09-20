import {
  CREATE,
  READPROD,
  READCAT,
  UPDATE,
  DELETE,
  ERROR,
  LOADING,
  STATUS,
} from "../constants";

export default (
  app = { products: [], status: {}, categories: [], loading: false, err: [] },
  action
) => {
  switch (action.type) {
    /* case READPROD:
            return action.payload.products; */
    case READPROD:
      return { ...app, products: action.payload.products };
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

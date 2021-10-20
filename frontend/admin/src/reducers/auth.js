import { LOGIN, LOGOUT } from "src/constants";

const initialState = {
  authenticated: null,
  user: null,
};

export default (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...auth,
        authenticated: true,
        user: action.payload.status.payload.user,
      };
    case LOGOUT:
      return { ...auth, authenticated: false, user: null };
    default:
      return auth;
  }
};

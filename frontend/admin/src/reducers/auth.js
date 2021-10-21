import { LOGIN, READADMIN, LOGOUT } from "src/constants";

const initialState = {
  authenticated: null,
  user: null,
  admins:[]
};

export default (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...auth,
        authenticated: true,
        user: action.payload.status.payload.user,
      };
    case READADMIN:
      return {
        ...auth,
        authenticated: true,
        admins: action.payload.admins,
      };
    case LOGOUT:
      return { ...auth, authenticated: false, user: null };
    default:
      return auth;
  }
};

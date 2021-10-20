import { LOGIN, LOGOUT } from "src/constants";

const initialState = {
    authenticated: null
};

export default (auth = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {...auth, authenticated: true};
        case LOGOUT:
            return {...auth, authenticated: false};
        default:
            return auth;
    }
};
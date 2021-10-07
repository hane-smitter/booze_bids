import {
  CREATEUSER,
  ERRORUSER,
  LOADINGUSER,
  STATUSUSER
} from "../constants";

export default (
  person = {
    users: {},
    user:{},
    status: {},
    loading: false,
    err: [],
  },
  action
) => {
  switch (action.type) {
    
    case CREATEUSER:
      return {
        ...person,
        users: {...person.users, user: action.payload.user},
      };
   
    case STATUSUSER:
      return {
        ...person,
        status: action.payload.status,
      };
    case ERRORUSER:
      return {
        ...person,
        err: [...action.payload.err],
      };
    case LOADINGUSER:
      return {
        ...person,
        loading: Boolean(action.payload.status),
      };
    default:
      return person;
  }
};

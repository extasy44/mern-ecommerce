import { userType } from './userType';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userType.LOGGED_IN_USER:
      return action.payload;

    case userType.LOG_OUT:
      return action.payload;

    default:
      return state;
  }
};

import { constants } from "./constants";


const userReducer = (state, { type, ...res }) => {
  switch (type) {
    case constants.LOGIN:
      return Object.assign({}, state, {
        loading: res.loading,
        isLoggedIn: res.isLoggedIn || false,
        data: res.data,
      });
    case constants.LOGOUT:
      return Object.assign({}, state, {
        loading: res.loading,
        isLoggedIn: false,
        data: {},
      });
    default:
      return state;
  }
};

export default userReducer;

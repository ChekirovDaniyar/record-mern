import { constants } from "./constants";


const productReducer = (state, { type, ...res }) => {
  switch (type) {
    case constants.GET_LIST:
      return Object.assign({}, state, {
        data: res.data || state?.data,
        loading: res.loading || false,
      });
    case constants.CREATE || constants.UPDATE || constants.DELETE:
      return Object.assign({}, state, {
        createLoading: res.loading || false,
      });
    case constants.GET_ONE:

      return Object.assign({}, state, {
        selected: {
          data: res.data,
          loading: res.loading || false,
        }
      });
    default:
      return state;
  }
};

export default productReducer;

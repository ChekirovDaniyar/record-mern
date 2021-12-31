import { constants } from "./constants";


const branchesReducer = (state, { type, ...res }) => {
  switch (type) {
    case constants.GET_BRANCHES:
      return Object.assign({}, state, {
        data: res.data,
        loading: res.loading || false,
      });
    case constants.CREATE_BRANCH:
      return Object.assign({}, state, {
        createLoading: res.loading || false,
      });
    default:
      return state;
  }
};

export default branchesReducer;

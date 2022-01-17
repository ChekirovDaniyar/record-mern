import { constants } from "./constants";


const workersReducer = (state, { type, ...res }) => {
  switch (type) {
    case constants.GET_ALL:
      return Object.assign({}, state, {
        all: res.data || [],
        loading: res.loading || false,
      });
    case constants.GET_ONE:
      return Object.assign({}, state, {
        selected: {
          ...state.selected,
          data: res.data || {},
          loading: res.loading || false,
        }
      });
    case constants.CREATE:
      return Object.assign({}, state, {
        createLoading: res.loading || false,
      });
    case constants.DELETE:
      return Object.assign({}, state, {
        selected: {
          ...state.selected,
          deleteLoading: res.deleteLoading || false
        },
      });
    default:
      return state;
  }
};

export default workersReducer;

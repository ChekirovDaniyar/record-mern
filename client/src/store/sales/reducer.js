const salesReducer = (state, { type, ...res }) => {
  switch (type) {
    case 'GET_SALES':
      return Object.assign({}, state, {
        data: res.data || [],
        loading: res.loading || false,
      });
    default:
      return state;
  }
};

export default salesReducer;

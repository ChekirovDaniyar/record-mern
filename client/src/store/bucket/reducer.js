const bucketReducer = (state, { type, data }) => {
  switch (type) {
    case 'CHANGE_BUCKET':
      return data;
    default:
      return state;
  }
};

export default bucketReducer;

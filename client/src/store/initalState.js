export const initialState = {
  user: {
    data: null,
    isLoggedIn: false,
    loading: false,
  },
  products: {
    loading: false,
    data: [],
    createLoading: false,
    selected: {
      data: null,
      loading: false,
    }
  },
  sales: {
    data: [],
    loading: false,
  },
  bucket: [],
  branches: {
    data: [],
    loading: false,
    createLoading: false,
  },
  workers: {
    all: [],
    selected: {
      data: null,
      loading: false,
    },
    loading: false,
  },
};

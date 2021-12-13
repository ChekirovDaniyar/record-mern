export const initialState = {
  user: {
    data: null,
    isLoggedIn: false,
    loading: false,
  },
  products: {
    loading: false,
    data: [],
  },
  sales: {
    data: [],
    loading: false,
  },
  bucket: [],
  stats: {
    data: {},
    loading: false,
  },
  branches: {
    data: [],
    loading: false,
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

import { toast } from "react-toastify";
import { constants } from "./constants";
import { request } from "../../utils";


export const getProductsList = async dispatch => {
  dispatch({ type: constants.GET_LIST, loading: true });
  try {
    const res = await request('/product/all');

    dispatch({ type: constants.GET_LIST, loading: false, data: res.body });
  } catch (error) {
    dispatch({ type: constants.GET_LIST, loading: false, error });
    toast.error(JSON.parse(error.message).error);
    return { success: false, error };
  }
};

export const createProduct = async (dispatch, data) => {
  dispatch({ type: constants.CREATE, loading: true });
  try {
    const res = await request('/product/create', data, 'POST');

    dispatch({ type: constants.GET_LIST, loading: false, data: res.body });
    toast.success(res.message);
  } catch (error) {
    dispatch({ type: constants.GET_LIST, loading: false });
    toast.error(JSON.parse(error.message).error);
  } finally {
    dispatch({ type: constants.CREATE, loading: false });
  }
};

export const getProductById = async (dispatch, id) => {
  dispatch({ type: constants.GET_ONE, loading: true });
  try {
    const res = await request(`/product/${id}`);
    dispatch({ type: constants.GET_ONE, loading: false, data: res.body });

  } catch (error) {
    dispatch({ type: constants.GET_ONE, loading: false });
    toast.error(JSON.parse(error.message).error);
  }
};

export const updateProduct = async (dispatch, id, data) => {
  dispatch({ type: constants.UPDATE, loading: true });
  try {
    const res = await request(`/product/${id}`, data, 'PATCH');

    dispatch({ type: constants.GET_ONE, loading: false, data: res.body });
    toast.success(res.message);
  } catch (error) {
    dispatch({ type: constants.GET_ONE, loading: false });
    toast.error(JSON.parse(error.message).error);
  } finally {
    dispatch({ type: constants.UPDATE, loading: false });
  }
};

export const deleteProduct = async (dispatch, id) => {
  try {
    const res = await request(`/product/${id}`, null, 'DELETE');

    dispatch({ type: constants.GET_LIST, data: res.body, loading: false });
    toast.success(res.message);
  } catch (error) {
    dispatch({ type: constants.GET_LIST, loading: false });
    toast.error(JSON.parse(error.message).error);
  }
};

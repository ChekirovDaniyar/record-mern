import { toast } from "react-toastify";
import { constants } from "./constants";
import { request } from "../../utils";


export const getAllWorkers = async (dispatch) => {
  dispatch({ type: constants.GET_ALL, loading: true });
  try {
    const res = await request('/user/all');

    dispatch({ type: constants.GET_ALL, data: res.body, loading: false });
  } catch (error) {
    toast.error('Работники не получены!');
    dispatch({ type: constants.GET_ALL, loading: false, error });
  }
};

export const getOneWorker = async (dispatch, id) => {
  dispatch({ type: constants.GET_ONE, loading: true });
  try {
    const res = await request(`/user/${id}`);

    dispatch({ type: constants.GET_ONE, loading: false, data: res.body });
  } catch (error) {
    toast.error('Работник не получен!');
    dispatch({ type: constants.GET_ONE, loading: false, error });
  }
};

export const createWorker = async (dispatch, data) => {
  dispatch({ type: constants.CREATE, loading: true });
  try {
    const res = await request('/user/create', data, 'POST');
    toast.success(res.message)
    dispatch({ type: constants.GET_ALL, loading: false, data: res.body });
  } catch (error) {
    toast.error('Произошла ошибка!');
    dispatch({ type: constants.GET_ALL, loading: false })
  } finally {
    dispatch({ type: constants.CREATE, loading: false });
  }
};

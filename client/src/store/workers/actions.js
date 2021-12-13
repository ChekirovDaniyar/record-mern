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

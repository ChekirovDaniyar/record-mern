import { toast } from "react-toastify";
import { constants } from "./constants";
import { request } from "../../utils";


export const getProductsList = async dispatch => {
  dispatch({ type: constants.GET_LIST, loading: true });
  try {
    const res = await request('/product/all', null);

    dispatch({ type: constants.GET_LIST, loading: false, data: res.body });
    toast.success(res.message);
  } catch (error) {

    dispatch({ type: constants.GET_LIST, loading: false, error });
    toast.error(JSON.parse(error.message).error);
    return { success: false, error };
  }
};

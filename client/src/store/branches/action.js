import { toast } from "react-toastify";
import { constants } from "./constants";
import { request } from "../../utils";


export const getBranches = async (dispatch) => {
  dispatch({ type: constants.GET_BRANCHES, loading: true });
  try {
    const res = await request('/branch/all');

    dispatch({ type: constants.GET_BRANCHES, loading: false, data: res.body });
  } catch (error) {
    dispatch({ type: constants.GET_BRANCHES, loading: false });
    toast.error(JSON.parse(error.message).error);
  }
};

export const createBranch = async (dispatch, data) => {
  dispatch({ type: constants.CREATE_BRANCH, loading: true });
  try {
    const res = await request('/branch/create', data, 'POST');
    dispatch({ type: constants.GET_BRANCHES, loading: false, data: res.body });
  } catch (error) {
    toast.error(JSON.parse(error.message).error);
  } finally {
    dispatch({ type: constants.CREATE_BRANCH, loading: false });
  }
};

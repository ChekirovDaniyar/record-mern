import { toast } from "react-toastify";
import { objectToQuery, request } from "../../utils";


export const getSales = async (dispatch, filter) => {
  dispatch({ type: 'GET_SALES', loading: true });
  try {
    const { body, message } = await request(`/sales/get?${objectToQuery(filter)}`, null);
    dispatch({ type: 'GET_SALES', data: body, loading: false });
    toast.success(message);
    return { success: true, data: body };
  } catch (error) {
    dispatch({ type: 'GET_SALES', loading: false, error });
    toast.error(JSON.parse(error.message).error);

    return { success: false, error };
  }
};

export const clearSales = (dispatch) => {
  dispatch({ type: 'GET_SALES', data: [], loading: false });
};

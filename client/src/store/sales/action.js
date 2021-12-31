import { toast } from "react-toastify";
import { objectToQuery, request } from "../../utils";
import { clearBucket} from "../bucket/actions";


export const getSales = async (dispatch, filter) => {
  dispatch({type: 'GET_SALES', loading: true});
  try {
    const { body, message } = await request(`/sales/get?${objectToQuery(filter)}`, null);
    dispatch({ type: 'GET_SALES', data: body, loading: false });
    toast.success(message);

    return {success: true, data: body};
  } catch (error) {
    dispatch({ type: 'GET_SALES', loading: false, error });
    toast.error(JSON.parse(error.message).error);

    return { success: false, error };
  }
};

export const clearSales = (dispatch) => {
  dispatch({type: 'GET_SALES', data: [], loading: false});
};

export const sendSales =  (dispatch, data) => {
  Promise.all(data.bucket.map(el => request('/sales/create', {
    productId: el._id,
    userId: data.userId,
    branchId: data.branch,
  }, 'POST')))
    .then(() => {
      clearBucket(dispatch);
      toast.success('Продажи сохранены!');
    })
    .catch(() => {
      toast.error('Ошибка! Проверьте филиал и товары!');
    })
};

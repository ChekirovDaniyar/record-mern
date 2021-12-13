import { toast } from "react-toastify";
import { request } from '../../utils/index';
import { constants } from "./constants";


export const login = async (dispatch, data) => {
  dispatch({ type: constants.LOGIN, loading: true });
  try {
    const { body, message } = await request('/user/login', data, 'POST');

    localStorage.setItem('token', body.token);
    localStorage.setItem('id', body._id);
    dispatch({ type: constants.LOGIN, loading: false, data: body, isLoggedIn: true });
    toast.success(message);

    return { success: true, data: body };
  } catch (error) {
    dispatch({ type: constants.LOGIN, loading: false, error, isLoggedIn: false });
    toast.error(JSON.parse(error.message).error);

    return { success: false, error };
  }
};

export const autoLogin = async (dispatch) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  if (!token || !id) {
    return;
  }
  try {
    const { body, } = await request(`/user/${id}`, null);

    localStorage.setItem('token', body.token);
    localStorage.setItem('id', body._id);

    dispatch({ type: constants.LOGIN, loading: false, data: body, isLoggedIn: true });
    toast.success('Вы успешно вошли в систему!');
  } catch (error) {
    dispatch({ type: constants.LOGIN, loading: false, error, isLoggedIn: false });
    toast.error('Войдите заново!');
    return { success: false, error };
  }
};

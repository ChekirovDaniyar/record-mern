import {toast} from "react-toastify";

const CHANGE_BUCKET = 'CHANGE_BUCKET';

export const getItems = dispatch => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];
  dispatch({type: CHANGE_BUCKET, data: items});
  return {success: true, data: items};
};

export const addItem = (dispatch, item) => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];

  items.push(item);
  localStorage.setItem('bucket', JSON.stringify(items));
  dispatch({type: CHANGE_BUCKET, data: items});
  toast.success(`${item.name} добавлен!`, {autoClose: 1200});
};

export const removeItem = (dispatch, id) => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];
  const index = items.indexOf(items.find(el => el._id === id));
  if (index >= 0) {
    items.splice(index, 1);
  }
  localStorage.setItem('bucket', JSON.stringify(items));
  dispatch({type: CHANGE_BUCKET, data: items.filter(Boolean)});
};

export const clearBucket = dispatch => {
  localStorage.setItem('bucket', JSON.stringify([]));
  dispatch({type: CHANGE_BUCKET, data: []});
};

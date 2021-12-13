import { toast } from "react-toastify";

const CHANGE_BUCKET = 'CHANGE_BUCKET';

export const getItems = dispatch => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];
  dispatch({ type: CHANGE_BUCKET, data: items });
  return { success: true, data: items };
};

export const addItem = (dispatch, item) => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];

  if (!items.some(el => el._id === item._id)) {
    items.push(item);
    localStorage.setItem('bucket', JSON.stringify(items));
    dispatch({ type: CHANGE_BUCKET, data: items });
    toast.success(`${item.name} добавлен!`);
  } else {
    items.find(el => el._id === item._id).amount += 1;
    localStorage.setItem('bucket', JSON.stringify(items));
    dispatch({ type: CHANGE_BUCKET, data: items });
    toast.success(`Кол-во ${item.name} увеличено!`);
  }
};

export const removeItem = (dispatch, id) => {
  const items = JSON.parse(localStorage.getItem('bucket')) || [];
  items.find((i, index) => {
    if (i._id === id) {
      if (items[index].amount === 1) {
        delete items[index];
      } else {
        items[index].amount -= 1;
      }
    }
  });

  localStorage.setItem('bucket', JSON.stringify(items.filter(Boolean)));
  dispatch({ type: CHANGE_BUCKET, data: items });
};

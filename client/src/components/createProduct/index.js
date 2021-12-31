import * as React from 'react';
import { toast } from "react-toastify";

import { connectContext } from "../../store";
import { createProduct } from "../../store/products/actions";
import { SpinnerLoader } from "../loaders/spinnerLoader";
import styles from './create.module.scss';
import {ButtonLoader} from "../loaders/buttonLoader";


const CreateProduct = ({ dispatch, loading }) => {
  const [inputData, setInputData] = React.useState({
    type: 'ring'
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputData({
      ...inputData,
      [name]: value.trim(),
    });
  };

  const isValid = inputData.name && inputData.price && inputData.type;

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      createProduct(dispatch, inputData);
      setInputData({});
    } else {
      toast.error('Заполните все поля!');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3>Создать товар</h3>
      <form action="#" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Название"
          onChange={handleChange}
        />
        <input
          className="input"
          type="text"
          name="price"
          placeholder="Цена"
          onChange={handleChange}
        />
        <select name="type" id="type" value={inputData.type} onChange={handleChange}>
          <option value="ring">Кольца</option>
          <option value="bracelet">Браслет</option>
          <option value="chain">Цепочка</option>
          <option value="anklet">Анклет</option>
        </select>
        <button className="submitBtn" disabled={loading || !isValid}>
          {loading ? <ButtonLoader /> : 'Готово'}
        </button>
      </form>
    </div>
  );
};

export default connectContext(CreateProduct, ({ products: { createLoading } }) => ({
  loading: createLoading,
}));

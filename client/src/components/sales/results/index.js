import * as React from 'react';
import { useHistory } from "react-router-dom";

import { connectContext } from "../../../store";
import { countItems, getProductType } from "../../../utils";
import styles from './results.module.scss';


const SalesResult = ({ data, showList = false, productList = [] }) => {
  const history = useHistory();

  const goToProduct = id => {
    history.push(`/product/${id}`);
  };

  const filteredData = data.products?.filter((curr, idx, arr) => (
    arr.findIndex(res => (res._id === curr._id)) === idx
  ));

  return (
    <div className={styles.wrapper}>
      <h2>Результаты:</h2>
      <div className={styles.content}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th>Название</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Тип</th>
            </tr>
            </thead>
            <tbody>
            {!showList && filteredData?.map((item, idx) => (
              <tr key={item._id + idx} onClick={() => goToProduct(item._id)}>
                <td>{item.name}</td>
                <td>{countItems(data.products, item._id)}</td>
                <td>{item.price}</td>
                <td>{getProductType(item.type)}</td>
              </tr>
            ))}
            {showList && productList.map((item, idx) => (
              <tr key={item._id + idx} onClick={() => goToProduct(item._id)}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
                <td>{getProductType(item.type)}</td>
              </tr>
            ))}
            </tbody>
          </table>
      </div>
      { !showList && <h4>Итого: {data.total}</h4> }
    </div>
  );
};

export default connectContext(SalesResult, ({ sales: { data } }) => ({
  data,
}));

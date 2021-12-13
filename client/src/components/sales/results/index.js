import * as React from 'react';
import { connectContext } from "../../../store";
import styles from './results.module.scss';


const SalesResult = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h2>Результаты:</h2>
      {!!data?.length && (
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
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.price}</td>
              <td>{item.type}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default connectContext(SalesResult, ({ sales: { data } }) => ({
  data,
}));

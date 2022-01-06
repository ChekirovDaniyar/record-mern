import * as React from 'react';
import PlusSvg from '../../assets/plus.svg';
import MinusSvg from '../../assets/minus.svg';
import { connectContext } from "../../store";
import { addItem, removeItem } from "../../store/bucket/actions";
import styles from './productCounter.module.scss';


const ProductCounter = ({ item, dispatch, count = 0 }) => {
  const handleIncrement = () => {
    addItem(dispatch, item);
  };

  const handleDecrement = () => {
    removeItem(dispatch, item._id);
  };

  return (
    <tr className={styles.wrapper}>
      <td>{item.name}</td>
      <td className={styles.count}>{count}</td>
      <td>{item.price} сом</td>
      <td onClick={handleIncrement}>
        <img src={PlusSvg} alt="plus"/>
      </td>
      <td onClick={handleDecrement}>
        <img src={MinusSvg} alt="minus"/>
      </td>
    </tr>
  );
};

export default connectContext(ProductCounter);

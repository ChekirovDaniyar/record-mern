import * as React from 'react';
import {addItem, removeItem} from "../../store/bucket/actions";
import styles from './productCounter.module.scss';


const ProductCounter = ({ item }) => {
  const handleIncrement = () => {
    addItem(item);
  };

  const handleDecrement = () => {
    removeItem(item);
  };

  return (
    <div className={styles.wrapper}>
      <div>{item.name}</div>
      <div>
        <img onClick={handleIncrement} src="../../assets/plus.svg" alt="plus"/>
      </div>
      <div>
        <img onClick={handleDecrement} src="../../assets/minus.svg" alt="minus"/>
      </div>
    </div>
  );
};

export default ProductCounter;

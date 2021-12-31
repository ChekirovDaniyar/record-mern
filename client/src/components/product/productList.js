import * as React from 'react';
import SalesResult from "../sales/results";
import { getProductsList } from "../../store/products/actions";
import { connectContext } from "../../store";
import { SpinnerLoader } from "../loaders/spinnerLoader";
import styles from './productList.module.scss'


const ProductList = ({ data, loading, dispatch }) => {
  React.useEffect(() => {
    getProductsList(dispatch);
  }, []);
  return (
    <div className={styles.wrapper}>
      <h3>Товары</h3>
      { loading && <SpinnerLoader /> }
      <SalesResult showList={true} productList={data} />
    </div>
  );
};

export default connectContext(ProductList, ({ products: { data, loading } }) => ({
  data,
  loading,
}));

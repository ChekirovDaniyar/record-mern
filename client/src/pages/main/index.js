import * as React from 'react';
import { useHistory } from "react-router-dom";
import Header from "../../components/header";

import ProductCounter from "../../components/product/productCounter";
import Branches from "../../components/branches";
import { SpinnerLoader } from "../../components/loaders/spinnerLoader";
import { getProductsList } from "../../store/products/actions";
import { connectContext } from "../../store";
import { getItems } from "../../store/bucket/actions";
import { sendSales } from "../../store/sales/action";
import { countItems } from "../../utils";
import styles from './main.module.scss';


const MainPage = ({dispatch, user, products, loading, bucket}) => {
  const [branch, setBranch] = React.useState('');
  const [search, setSearch] = React.useState('');
  const history = useHistory();

  const handleSend = () => {
    if (user.isLoggedIn && !loading && branch && bucket.length) {
      sendSales(dispatch, {
        userId: user.data._id,
        bucket,
        branch,
      });
    }
  };

  const filteredBucket = React.useCallback(bucket.filter((curr, idx, arr) => (
    arr.findIndex(res => (res._id === curr._id)) === idx
  )), [bucket]);

  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const filterProducts = React.useCallback(() => {
    if (!search.length) {
      return products;
    }
    return products.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, products]);

  React.useEffect(() => {
    if (!user.isLoggedIn && !user.loading) {
      history.push('/login');
    }
  }, [user]);

  React.useEffect(() => {
    getProductsList(dispatch);
    getItems(dispatch);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className="container">
        <div>
          <h1>Страница учета</h1>
          {loading ? <SpinnerLoader/> : null}
          <h3>Поиск</h3>
          <input className="input" type="text" value={search} onChange={handleSearchChange}/>
          <h3>Список товаров</h3>
          <table>
            <tbody>
            {filterProducts()?.map(item => (
              <ProductCounter item={item} key={item._id} count={countItems(bucket, item._id)}/>
            ))}
            </tbody>
          </table>
          <h3>Добавленные товары:</h3>
          <table>
            {filteredBucket?.map(item => (
              <ProductCounter item={item} key={item._id} count={countItems(bucket, item._id)}/>
            ))}
          </table>
          <h3>Итого: {bucket.reduce((sum, item) => sum + item.price, 0)}</h3>
          <Branches handleChange={setBranch}/>
          <button onClick={handleSend} disabled={!bucket.length} className="submitBtn">Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default connectContext(MainPage, (
  {
    user,
    products: {data, loading},
    bucket,
  }) => ({
  user,
  products: data || [],
  loading,
  bucket,
}));

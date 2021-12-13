import * as React from 'react';
import { useHistory } from "react-router-dom";
import Header from "../../components/header";

import ProductCounter from "../../components/product/productCounter";
import { getProductsList } from "../../store/products/actions";
import { connectContext } from "../../store";
import { SpinnerLoader } from "../../components/loaders/spinnerLoader";


const MainPage = ({ dispatch, user, products, loading, bucket }) => {
  const history = useHistory();

  React.useEffect(() => {
    if (!user.isLoggedIn && !user.loading) {
      history.push('/login');
    }
  }, [user]);

  React.useEffect(() => {
    getProductsList(dispatch);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <h1>Страница учета</h1>
        { loading ? <SpinnerLoader /> : null }
        <h3>Список товаров</h3>
        {products?.map(item => (
          <ProductCounter item={item} key={item._id}/>
        ))}
        <h3>Добавленные товары:</h3>
        {bucket?.map(item => (
          <ProductCounter item={item} key={item._id}/>
        ))}
      </div>
    </div>
  );
};

export default connectContext(MainPage, ({
    user,
    products: { data, loading },
    bucket,
  }) => ({
  user,
  products: data || [],
  loading,
  bucket,
}));

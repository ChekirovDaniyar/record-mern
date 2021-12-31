import * as React from 'react';
import { useParams } from "react-router-dom";

import Header from "../../components/header";
import { connectContext } from "../../store";
import { getProductById, updateProduct } from "../../store/products/actions";
import { SpinnerLoader } from "../../components/loaders/spinnerLoader";
import styles from './productPage.module.scss';


const ProductPage = ({ dispatch, loading, data }) => {
  const [productData, setProductData] = React.useState({});
  const params = useParams();

  const isBtnDisabled = () => {
    // TODO: Write this shit more clear
    return data?.name === productData.name
      && data?.price === productData.price
      && data?.amount === productData.amount;
  };

  const handleChange = ({ target: { name, value } }) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProduct(dispatch, params.id, productData);
  };

  React.useEffect(() => {
    getProductById(dispatch, params.id);
  }, []);

  React.useEffect(() => {
    if (data && Object.keys(data).length) {
      const { name, price, amount } = data;
      setProductData({ name, price, amount });
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className="container">
          {loading && <SpinnerLoader />}
          {!loading ? (
            <React.Fragment>
              <h3>Товар: {data?.name}</h3>
              <form action="#" onSubmit={handleSubmit}>

                <p>Название</p>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={productData.name || ''}
                  onChange={handleChange}
                />

                <p>Цена</p>
                <input
                  className="input"
                  type="text"
                  name="price"
                  value={productData.price || ''}
                  onChange={handleChange}
                />

                <p>Количество</p>
                <input
                  className="input"
                  type="text"
                  name="amount"
                  value={productData.amount}
                  onChange={handleChange}
                />

                <button disabled={isBtnDisabled() || loading} className="submitBtn">Изменить</button>

              </form>
              <h5>В будущем дальше будет статистика)</h5>
            </React.Fragment>
          ): null}
        </div>
      </div>
    </div>
  )
};

export default connectContext(ProductPage, ({ products: { selected } }) => ({
  ...selected,
}));

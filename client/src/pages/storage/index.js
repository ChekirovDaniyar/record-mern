import * as React from 'react';
import Header from "../../components/header";
import ProductList from "../../components/product/productList";
import CreateProduct from "../../components/createProduct";


const StoragePage = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <CreateProduct />
        <ProductList />
      </div>
    </React.Fragment>
  );
};

export default React.memo(StoragePage);

import * as React from 'react';
import Sales from "../../components/sales";
import WorkersList from "../../components/workers";
import Header from "../../components/header";
import CreateProduct from "../../components/createProduct";
import styles from './admin.module.scss';
import ProductList from "../../components/product/productList";
import CreateBranch from "../../components/branches/create";


const AdminPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className="container">
        <Sales />
        <WorkersList />
        <CreateBranch />
      </div>
    </div>
  );
};

export default React.memo(AdminPage);

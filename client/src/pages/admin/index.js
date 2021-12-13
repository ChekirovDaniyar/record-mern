import * as React from 'react';
import Sales from "../../components/sales";
import WorkersList from "../../components/workers";
import styles from './admin.module.scss';
import Header from "../../components/header";


const AdminPage = () => {

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className="container">
        <Sales />
        <WorkersList />
      </div>
    </div>
  );
};

export default AdminPage;

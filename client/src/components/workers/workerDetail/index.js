import * as React from 'react';
import { useParams } from "react-router-dom";

import Sales from "../../sales";
import SalesResult from "../../sales/results";
import { clearSales } from "../../../store/sales/action";
import { SpinnerLoader } from "../../loaders/spinnerLoader";
import { connectContext } from "../../../store";
import { getOneWorker } from "../../../store/workers/actions";
import styles from './workerDetail.module.scss';
import Header from "../../header";


const WorkerDetail = ({ dispatch, data, loading }) => {
  const params = useParams();

  React.useEffect(() => {
    clearSales(dispatch);
    getOneWorker(dispatch, params.id);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      {loading ? <SpinnerLoader/> : null}
      {!loading ? (
        <React.Fragment>
          <h3>Продавец: {data?.name}</h3>
          <Sales dispatch={dispatch} userId={data?._id} loading={loading}/>
        </React.Fragment>
        ) : null}
    </div>
  );
};

export default connectContext(WorkerDetail, (
  {
    workers: {
      selected: {
        data, loading
      }
    },
  }) => ({
  data,
  loading,
}));

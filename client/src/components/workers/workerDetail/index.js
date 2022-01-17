import * as React from 'react';
import  {useHistory, useParams } from "react-router-dom";

import Sales from "../../sales";
import Header from "../../header";
import { clearSales } from "../../../store/sales/action";
import { SpinnerLoader } from "../../loaders/spinnerLoader";
import { connectContext } from "../../../store";
import { deleteWorker, getOneWorker } from "../../../store/workers/actions";
import { ButtonLoader } from "../../loaders/buttonLoader";
import styles from './workerDetail.module.scss';


const WorkerDetail = ({ dispatch, data, loading, deleteLoading }) => {
  const params = useParams();
  const history = useHistory();

  const handleDelete = async() => {
    await deleteWorker(dispatch, params.id);
    history.push('/admin');
  };

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

          <button
            onDoubleClick={handleDelete}
            disabled={deleteLoading}
            className="redBtn"
          >
            {deleteLoading ? <ButtonLoader /> : 'Удалить (двойной клик)'}
          </button>
        </React.Fragment>
        ) : null}
    </div>
  );
};

export default connectContext(WorkerDetail, (
  {
    workers: {
      selected: {
        data,
        loading,
        deleteLoading,
      }
    },
  }) => ({
  data,
  loading,
  deleteLoading,
}));

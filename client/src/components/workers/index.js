import * as React from 'react';
import WorkerItem from "./workerItem";
import { connectContext } from '../../store';
import { getAllWorkers } from "../../store/workers/actions";
import { SpinnerLoader } from "../loaders/spinnerLoader";
import styles from './workers.module.scss';


const WorkersList = ({ dispatch, workers, loading }) => {

  React.useEffect(() => {
    getAllWorkers(dispatch);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Персонал</h2>
      { loading && <SpinnerLoader /> }
      <div className={styles.content}>
        { workers.length ? workers.map(item => (
          <WorkerItem _id={item._id} name={item.name} key={item._id}/>
        )) : null }
      </div>
    </div>
  );
};

export default connectContext(WorkersList, ({ workers: { all, loading } }) => ({
  workers: all || [],
  loading,
}));

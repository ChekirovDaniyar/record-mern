import * as React from 'react';
import WorkerItem from "./workerItem";
import { connectContext } from '../../store';
import {createWorker, getAllWorkers} from "../../store/workers/actions";
import { SpinnerLoader } from "../loaders/spinnerLoader";
import styles from './workers.module.scss';


const WorkersList = ({ dispatch, workers, loading, createLoading }) => {
  const [user, setUser] = React.useState({
    isAdmin: false,
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (user.name?.trim() && user.password?.trim()) {
      createWorker(dispatch, user);
    }
  };

  React.useEffect(() => {
    getAllWorkers(dispatch);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Персонал</h2>
      <form action="#" onSubmit={handleSubmit}>
        <h3>Создать пользователя</h3>
        <input className="input" type="text" name="name" onChange={handleChange} placeholder="Имя"/>
        <input className="input" type="text" name="password" onChange={handleChange} placeholder="Пароль"/>
        <p>Сделать админом?</p>
        <label htmlFor="no">
          Нет
          <input id="no" type="radio" value={'false'} name="isAdmin" onChange={handleChange}/>
        </label>
        <label htmlFor="yes">
          Да
          <input id="yes" type="radio" value={'true'} name="isAdmin" onChange={handleChange}/>
        </label>
        <button className="submitBtn" disabled={createLoading || !user.name?.trim()}>Создать</button>
      </form>
      { loading && <SpinnerLoader /> }
      <div className={styles.content}>
        { workers.length ? workers.map(item => (
          <WorkerItem _id={item._id} name={item.name} key={item._id}/>
        )) : null }
      </div>
    </div>
  );
};

export default connectContext(WorkersList, ({ workers: { all, loading, createLoading } }) => ({
  workers: all || [],
  loading,
  createLoading,
}));

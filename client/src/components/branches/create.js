import * as React from 'react';
import { connectContext } from "../../store";
import { createBranch } from "../../store/branches/action";
import { SpinnerLoader } from "../loaders/spinnerLoader";
import styles from './create.module.scss';
import {ButtonLoader} from "../loaders/buttonLoader";


const CreateBranch = ({ dispatch, loading, createLoading, data }) => {
  const [branch, setBranch] = React.useState('');

  const handleChange = ({ target: { value } }) => {
    setBranch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (branch.trim()) {
      createBranch(dispatch, { name: branch });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h3>Создать филиал</h3>
        <form action="#" onSubmit={handleSubmit}>
          <input className="input" type="text" onChange={handleChange}/>
          <button disabled={!branch.trim() || createLoading} className="submitBtn">
            {createLoading ? <ButtonLoader /> : 'Добавить'}
          </button>
        </form>
        <h3>Филиалы:</h3>
        {loading && <SpinnerLoader />}
        <div className={styles.branches}>
          {data?.map(el => <div className={styles.item} key={el._id}>{el.name}</div>)}
        </div>
      </div>
    </div>
  );
};

export default connectContext(CreateBranch, ({ branches: { data, createLoading, loading } }) => ({
  data,
  createLoading,
  loading,
}));

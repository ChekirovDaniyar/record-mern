import * as React from 'react';
import { Link } from "react-router-dom";
import { objectToQuery } from "../../../utils";
import styles from './workerItem.module.scss';


const WorkerItem = ({ name, _id }) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/user?${objectToQuery({_id})}`}>
        <div className={styles.item}>
          <h3>{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(WorkerItem);

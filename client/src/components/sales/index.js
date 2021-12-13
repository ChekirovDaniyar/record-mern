import * as React from 'react';
import DatePicker from 'react-datepicker';
import styles from './styles.module.scss';
import SalesResult from "./results";
import { connectContext } from '../../store';
import { getSales } from "../../store/sales/action";
import { ButtonLoader } from "../loaders/buttonLoader";


const Sales = ({ dispatch, loading, userId = null }) => {
  const [date, setDate] = React.useState({
    from: Date.now(),
    to: Date.now(),
  });

  const handleDateChange = (dateVal, type) => {
    setDate({
      ...date,
      [type]: dateVal,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSales(dispatch, { ...date, ...(userId ? { userId } : {}) });
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <h1>Продажи</h1>
          <form action="#" onSubmit={handleSubmit}>
            <div className={styles.dateWrapper}>
              <div className={styles.dateRow}>
                <span>Дата от:</span>
                <DatePicker
                  selected={date.from}
                  onChange={date => handleDateChange(date, 'from')}
                  className={styles.datePicker}
                />
              </div>
              <div className={styles.dateRow}>
                <span>Дата до:</span>
                <DatePicker
                  selected={date.to}
                  onChange={date => handleDateChange(date, 'to')}
                  className={styles.datePicker}
                />
              </div>
            </div>
            <button disabled={loading} className="submitBtn">
              {loading ? <ButtonLoader /> : 'Готово'}
            </button>
          </form>

          <SalesResult />
        </div>
      </div>
    </div>
  );
};

export default connectContext(Sales, ({ sales: { loading } }) => ({
  loading,
}));

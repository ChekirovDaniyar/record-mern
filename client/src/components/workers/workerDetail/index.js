import * as React from 'react';
import { useLocation } from "react-router-dom";

import Sales from "../../sales";
import SalesResult from "../../sales/results";
import { clearSales } from "../../../store/sales/action";
import { SpinnerLoader } from "../../loaders/spinnerLoader";
import { connectContext } from "../../../store";
import { getOneWorker } from "../../../store/workers/actions";


const WorkerDetail = ({ dispatch, data, loading }) => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  React.useEffect(() => {
    clearSales(dispatch);
    getOneWorker(dispatch, data?._id);
    console.log(search.split('='))
  }, [query]);

  return (
    <div>
      {loading ? <SpinnerLoader/> : null}
      {!loading ? (
        <React.Fragment>
          <h3>{data?.name}</h3>
          <Sales dispatch={dispatch} userId={data?._id} loading={loading}/>
          <SalesResult />
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

import * as React from 'react';
import { SpinnerLoader } from "../../../components/loaders/spinnerLoader";


const BaseGroup = ({ dispatch, type, name, loading }) => {
  const [data, setData] = React.useState([]);

  const fetchProducts = async () => {
    //  TODO: make request and save data in state
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>{name}</h3>
      { loading && <SpinnerLoader /> }
      { data.map(item => <div key={item._id}>{item}</div>) }
    </div>
  );
};

export default React.memo(BaseGroup);

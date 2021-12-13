import * as React from 'react';
import { connectContext } from "../../store";


const BasePage = ({ dispatch, data, loading }) => {

  React.useEffect(() => {
  //  TODO: request to get product list
  }, []);

  return (
    <div>
      <h2>База товаров</h2>

    </div>
  );
};

export default connectContext(BasePage, ({ products: { data, loading } }) => ({
  data,
  loading,
}));

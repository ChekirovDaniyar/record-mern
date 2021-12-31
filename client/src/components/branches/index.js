import * as React from 'react';
import { connectContext } from "../../store";
import { getBranches } from "../../store/branches/action";


const Branches = ({ dispatch, data, loading, handleChange, isSale = true }) => {

  React.useEffect(() => {
    getBranches(dispatch);
  }, []);

  React.useEffect(() => {
    if (data && isSale) {
      handleChange(data[0]?._id);
    }
  }, [data]);

  return (
    <div>
      <select name="branch" id="branch" onChange={e => handleChange(e.target.value)} disabled={loading}>
        {!isSale && <option value="all">Все</option>}
        {data?.map(el => <option value={el._id} key={el._id}>{el.name}</option>)}
      </select>
    </div>
  );
};

export default connectContext(Branches, ({branches: { data, loading }}) => ({
  loading,
  data,
}));

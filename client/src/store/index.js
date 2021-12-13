import * as React from 'react';
import user from "./user/reducer";
import bucket from "./bucket/reducer";
import sales from './sales/reducer';
import workers from "./workers/reducer";
import { combineReducers } from "../utils";
import { initialState } from "./initalState";

const Context = React.createContext(initialState);

const combinedReducer = combineReducers({
  user,
  bucket,
  sales,
  workers,
});

function ContextProvider ({ children }) {
  const [state, dispatch] = React.useReducer(combinedReducer, initialState);
  const context = React.useMemo(() => [state, dispatch], [state, dispatch]);
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

const connectContext = (Component, select) => {
  return (props) => {
    const [store, dispatch] = React.useContext(Context);
    const data = { ...(select ? select(store) : {}) };
    return React.useMemo(
      () => (
        <Component
          {...data}
          {...props}
          dispatch={dispatch}
        />
      ),
      [JSON.stringify(data), JSON.stringify(props)]
    );
  };
};

export { Context, connectContext, ContextProvider };

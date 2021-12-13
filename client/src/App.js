import * as React from 'react';
import { Switch, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import AdminPage from "./pages/admin";
import WorkerDetail from "./components/workers/workerDetail";
import { connectContext } from './store';
import { autoLogin } from "./store/user/actions";

import "react-datepicker/dist/react-datepicker.css";
import './App.scss';


const App = ({ user, dispatch }) => {
  React.useEffect(() => {
    if (!Object.keys(user).length) {
      autoLogin(dispatch);
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/login" component={LoginPage} />
      {user?.isAdmin ? (
          <React.Fragment>
            <Route exact path="/admin" component={AdminPage} />
            <Route path="/user" component={WorkerDetail} />
          </React.Fragment>
        ) : null}
      <Route component={() => <h1>404</h1>} />
    </Switch>
  );
};

export default connectContext(App, ({ user }) => ({
  user: user.data || {},
}));

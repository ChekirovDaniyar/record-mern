import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./store";


ReactDOM.render(
  <ContextProvider>
    <ToastContainer />
    <Router>
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById('root')
);

reportWebVitals();

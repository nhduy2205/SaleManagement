import React, { Fragment, useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './pages/User/User';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <div>
      <Admin />
      <Login />
    </div>
  );
};

export default App;

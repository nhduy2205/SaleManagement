import React, { Fragment, useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';


import Admin from './pages/Admin/Admin';
const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Login} />
            <PrivateRoute path='/admin' exact component={Admin} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

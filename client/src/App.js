import React, { Fragment, useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import AddProduct from './components/AddProduct/AddProduct';
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
        <Navbar></Navbar>
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <PrivateRoute path='/admin' exact component={Admin}></PrivateRoute>
          <PrivateRoute
            path='/addproduct'
            exact
            component={AddProduct}
          ></PrivateRoute>
          <PrivateRoute path='/plan' exact component={Admin}></PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

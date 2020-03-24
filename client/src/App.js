import React, { Fragment, useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import Admin from './pages/Admin/Admin';
=======

>>>>>>> e9695733b22fa454454b7b48a23c06e527b060ca
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
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
<<<<<<< HEAD
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Login} />
            <PrivateRoute path='/admin' exact component={Admin} />
          </Switch>
        </Fragment>
      </Router>
=======
        <Router>
            <Navbar></Navbar>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <PrivateRoute path="/admin" exact component={Admin}></PrivateRoute>
            </Switch>
        </Router>
>>>>>>> e9695733b22fa454454b7b48a23c06e527b060ca
    </Provider>
  );
};

export default App;

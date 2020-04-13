import React, { useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import AddProduct from './pages/AddProduct/AddProduct';
import WareHouse from './pages/WareHouse/WareHouse';
import PlanningDetails from './pages/PlanningDetails/PlanningDetails';
import Mission from './pages/User/Mission';
import Bill from './pages/User/Bill';
import Allbills from './pages/Admin/Allbills';
import BillDetail from './pages/Admin/BillDetail';
import Statis from './pages/Admin/Statis';
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
          <PrivateRoute
            path='/warehouse'
            exact
            component={WareHouse}
          ></PrivateRoute>
          <PrivateRoute
            path='/plandetails/:id'
            exact
            component={PlanningDetails}
          ></PrivateRoute>
          <PrivateRoute
            path='/mission'
            exact
            component={Mission}
          ></PrivateRoute>
          <PrivateRoute path='/bill' exact component={Bill}></PrivateRoute>
          <PrivateRoute path='/allbills' exact component={Allbills}></PrivateRoute>
          <PrivateRoute
            path='/billdetail/:id'
            exact
            component={BillDetail}
          ></PrivateRoute>
          <PrivateRoute
            path='/statis'
            exact
            component={Statis}
          ></PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

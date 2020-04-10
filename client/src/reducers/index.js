import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import product from './product';
import mission from './mission';
import bill from './bill';
export default combineReducers({
  alert,
  auth,
  product,
  mission,
  bill,
});

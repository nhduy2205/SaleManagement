import axios from 'axios'
import {GET_USERMISSION, CREATE_BILLS_SUCCESS} from './types'
import { setAlert } from './alert';

// get user mission
export const getUserMission = () => async (dispatch) => {
    try {
      const res = await axios.get('/api/plans/mission');
      dispatch({
        type: GET_USERMISSION,
        payload: res.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // create bills

  export const createBill = (customer_name, customer_phone, bills) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const body = JSON.stringify({customer_name, customer_phone, bills});
    try {
      await axios.post(`/api/bills`, body, config);
      dispatch({
        type: CREATE_BILLS_SUCCESS,
      });
      dispatch(setAlert('Create bill success !', 'success'));
    } catch (error) {
      const errors = error.response.data.errors
          if(errors){
              errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          }
    }
  };
  
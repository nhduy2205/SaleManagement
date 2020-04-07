import axios from 'axios'
import {GET_USERMISSION} from './types'


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
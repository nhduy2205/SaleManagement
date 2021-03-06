import axios from 'axios';
import { setAlert } from './alert';
import {
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GETALL_USER,
  USER_ERROR,
  DELETE_USER
  
} from './types';
import setAuthToken from '../utils/setAuthToken';
// import e from 'express';
//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // dispatch(setAlert('Login Success', 'success'))
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//getallUser

export const getAllUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');
    dispatch({
      type: GETALL_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.data,
    });
  }
};

//deleteUser

export const deleteUser = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  }
};



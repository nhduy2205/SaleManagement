import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_PRODUCT,
  GETALL_PRODUCT,
  DELETE_PRODUCT,
  PLANNING_SUCCESS,
} from './types';
// Thêm mới sản phẩm vào kho hàng
export const addProduct = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.post('/api/products', body, config);
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
      dispatch(setAlert('Add product successfully', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
    }
  }
};
//lấy toàn bộ danh sách hàng hóa
export const getAllProduct = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products');
    dispatch({
      type: GETALL_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

//Xóa 1 sản phẩm theo id
export const deleteProduct = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/api/products/${id}`);
      dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

// Phân công

export const planning = (id, product_list) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(product_list);
  try {
    await axios.post(`/api/plans/${id}`, body, config);
    dispatch({
      type: PLANNING_SUCCESS,
    });
    dispatch(setAlert('Add product successfully', 'success'));
  } catch (error) {
    console.error(error);
  }
};

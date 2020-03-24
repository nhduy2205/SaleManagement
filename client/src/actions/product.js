import axios from 'axios';
import {setAlert } from './alert'
import {
    ADD_PRODUCT
} from './types'

export const addProduct = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('/api/products', body, config)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })
        dispatch(setAlert('Add product successfully', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import './../../scss/login.scss';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from './../../actions/auth'
import jwtDecode from 'jwt-decode';
const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // console.log(formData)
    login({
      email,
      password
    });
  };
  if(isAuthenticated){
    const decoded = jwtDecode(localStorage.getItem('token'))
    if(decoded.user.role === "admin")
    return <Redirect to='/admin' exact />;
    else if(decoded.user.role === "user") return <Redirect to = "/user" exact />
  }
  return (
    <Fragment>
      <h1 className='title'>SALE MANAGEMENT</h1>
      <form className='login' >
        <span className='login-title'>LOGIN</span>
        <div className='form-group login-input'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend '>
              <span className='input-group-text login-icon'>
                <i className='fa fa-envelope' aria-hidden='true' />
              </span>
            </div>
            <input name='email' type='text' className='form-control' placeholder='Enter your E-mail' 
            value={email} onChange={e => onChange(e)} />
          </div>
        </div>
        <div className='form-group login-input'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend '>
              <span className='input-group-text login-icon'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>
            <input name='password' type='password' className='form-control' placeholder='Enter your Password' 
            value={password} onChange={e => onChange(e)}/>
          </div>
        </div>
        <input type='submit' className='btn login-button' value='Sign in' onClick={e => onSubmit(e)}/>
      </form>
    </Fragment>
  );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, {login})(Login)

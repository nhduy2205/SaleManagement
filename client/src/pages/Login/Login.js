import React from 'react';
import PropTypes from 'prop-types';
import './../../scss/login.scss';

function Login(props) {
  return (
    <div>
      <h1 className='title'>SALE MANAGEMENT</h1>
      <form action className='login'>
        <span className='login-title'>LOGIN</span>
        <div className='form-group login-input'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend '>
              <span className='input-group-text login-icon'>
                <i className='fa fa-envelope' aria-hidden='true' />
              </span>
            </div>
            <input
              name='email'
              type='text'
              className='form-control'
              placeholder='Enter your E-mail'
            />
          </div>
        </div>
        <div className='form-group login-input'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend '>
              <span className='input-group-text login-icon'>
                <i className='fa fa-lock' aria-hidden='true' />
              </span>
            </div>
            <input
              name='pass'
              type='password'
              className='form-control'
              placeholder='Enter your Password'
            />
          </div>
        </div>
        <input
          type='submit'
          className='btn login-button'
          defaultValue='Sigin'
        />
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;

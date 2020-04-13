import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  function getVNTime() {
    var time = new Date();
    var dow = time.getDay();
    if (dow === 0) dow = 'Sunday';
    else if (dow === 1) dow = 'Monday';
    else if (dow === 2) dow = 'Tuesday';
    else if (dow === 3) dow = 'Wednesday';
    else if (dow === 4) dow = 'Thursday';
    else if (dow === 5) dow = 'Friday';
    else if (dow === 6) dow = 'Saturday';
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    var hr = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    day = (day < 10 ? '0' : '') + day;
    month = (month < 10 ? '0' : '') + month;
    hr = (hr < 10 ? '0' : '') + hr;
    min = (min < 10 ? '0' : '') + min;
    sec = (sec < 10 ? '0' : '') + sec;
    return (
      dow +
      ' ' +
      month +
      '/' +
      day +
      '/' +
      year +
      ' ' +
      hr +
      ':' +
      min +
      ':' +
      sec
    );
  }
  function showTime() {
    var vnclock = document.getElementById('vnclock');
    if (vnclock != null) vnclock.innerHTML = getVNTime();
    setTimeout(showTime, 1000);
  }
  showTime();
  const showLink = () => {
    if (isAuthenticated === null) {
      return '';
    } else if (isAuthenticated) {
      var decoded = jwtDecode(localStorage.getItem('token'));
      //   console.log(decoded);
      if (decoded.user.role === 'admin') {
        return (
          <Fragment>
            <section className='header'>
              <div className='header-info'>
                <div className='header-datenow' id='vnclock'>
                  {/* {time()} */}
                </div>
                <i className='fa fa-user' />
                Admin
                <a href='/' onClick={logout} className='logout-btn ml-3'>
                  <i className='fa fa-sign-out'></i> Logout
                </a>
              </div>
            </section>

            <nav className='navbar navbar-expand-lg navbar-light header-bg'>
              <a className='navbar-brand header-logo' href='#/'>
                SALE MANAGEMENT
              </a>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon' />
              </button>
              <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                  <Link
                    to='/plan'
                    className='nav-item nav-link active header-item'
                    exact='true'
                  >
                    Planning<span className='sr-only'>(current)</span>
                  </Link>
                  <Link
                    to='/warehouse'
                    className='nav-item nav-link header-item'
                  >
                    Warehouse
                  </Link>
                  <Link
                    to='/addproduct'
                    className='nav-item nav-link header-item'
                  >
                    Import goods
                  </Link>
                  <Link className='nav-item nav-link header-item' to='/statis'>
                    Statistical
                  </Link>
                  <Link
                    to='/allbills'
                    className='nav-item nav-link header-item'
                  >
                    Bills today
                  </Link>
                </div>
              </div>
            </nav>
          </Fragment>
        );
      } else if (decoded.user.role === 'user') {
        return (
          <Fragment>
            <section className='header'>
              <div className='header-info'>
                <div className='header-datenow' id='vnclock'>
                  {/* {time()} */}
                </div>
                <i className='fa fa-user' />
                User
                <a href='/' onClick={logout} className='login-btn ml-3'>
                  <i className='fa fa-sign-out'></i> Logout
                </a>
              </div>
            </section>

            <nav className='navbar navbar-expand-lg navbar-light header-bg'>
              <a className='navbar-brand header-logo' href='#/'>
                SALE MANAGEMENT
              </a>
              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon' />
              </button>
              <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                  <Link
                    to='/mission'
                    className='nav-item nav-link active header-item'
                    exact='true'
                  >
                    Home<span className='sr-only'>(current)</span>
                  </Link>
                  <Link
                    to='/bill'
                    exact='true'
                    className='nav-item nav-link header-item'
                  >
                    Create bill
                  </Link>
                  
                </div>
              </div>
            </nav>
          </Fragment>
        );
      }
    }
  };
  return <Fragment>{showLink()}</Fragment>;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);

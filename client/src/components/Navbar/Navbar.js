import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const showLink = () => {
    if (isAuthenticated === null) {
      return '';
    } else if (isAuthenticated) {
      const decoded = jwtDecode(localStorage.getItem('token'));
      //   console.log(decoded);
      if (decoded.user.role === 'admin') {
        return (
          <Fragment>
            <section className='header'>
              <div className='header-info'>
                <i className='fa fa-user' />
                Admin
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
                    to='/plan'
                    className='nav-item nav-link active header-item'
                    exact='true'
                  >
                    Lập kế hoạch<span className='sr-only'>(current)</span>
                  </Link>
                  <Link to="/warehouse" className='nav-item nav-link header-item' >
                    Kho hàng
                  </Link>
                  <Link
                    to='/addproduct'
                    className='nav-item nav-link header-item'
                  >
                    Nhập hàng
                  </Link>
                  <a className='nav-item nav-link header-item' href='#/'>
                    Nhân viên
                  </a>
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
                    to='/plan'
                    className='nav-item nav-link active header-item'
                    exact='true'
                  >
                    Trang chủ<span className='sr-only'>(current)</span>
                  </Link>
                  <a className='nav-item nav-link header-item' href='#/'>
                    Tạo đơn hàng
                  </a>
                  <Link
                    to='/addproduct'
                    className='nav-item nav-link header-item'
                  >
                    Túi hàng
                  </Link>
                  <a className='nav-item nav-link header-item' href='#/'>
                    Thêm cửa hàng
                  </a>
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
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { logout })(Navbar);

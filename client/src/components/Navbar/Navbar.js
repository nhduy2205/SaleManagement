import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import jwtDecode from 'jwt-decode';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const showLink = () => {
    if (isAuthenticated === null) {
      return '';
    } else if (isAuthenticated) {
      const decoded = jwtDecode(localStorage.getItem('token'));
      console.log(decoded);
      if (decoded.user.role === 'admin') {
        return (
          <Fragment>
            <section className='header'>
              <div className='header-info'>
                <i className='fa fa-user' aria-hidden='true' />
                Admin
              </div>
            </section>

            <nav className='navbar navbar-expand-lg navbar-light header-bg'>
              <a className='navbar-brand header-logo' href='#'>
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
                  <a className='nav-item nav-link active header-item' href='#'>
                    Lập kế hoạch<span className='sr-only'>(current)</span>
                  </a>
                  <a className='nav-item nav-link header-item' href='#'>
                    Kho hàng
                  </a>
                  <a className='nav-item nav-link header-item' href='#'>
                    Nhập hàng
                  </a>
                  <a className='nav-item nav-link header-item' href='#'>
                    Nhân viên
                  </a>
                </div>
              </div>
            </nav>
          </Fragment>
        );
      } else if (decoded.user.role === 'user') {
        return (
          <nav className='nav justify-content-center'>
            <a className='nav-link active' href='#/'>
              Active link
            </a>
            <a className='nav-link' href='#/'>
              User
            </a>
            <a className='nav-link disabled' href='#/'>
              Disabled link
            </a>
          </nav>
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

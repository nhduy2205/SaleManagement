import React, { Component } from 'react';
import './../../scss/admin.scss';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <section className='header'>
          <div className='header-info'>
            <i className='fa fa-user' aria-hidden='true' />
            Admin
          </div>
        </section>
        {/* menu */}
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
      </div>
    );
  }
}

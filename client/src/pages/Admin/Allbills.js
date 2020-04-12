import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../scss/admin.scss';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getAllBills } from './../../actions/mission';
import { Link } from 'react-router-dom';

const Allbills = ({ getAllBills, bills: { bills, loading } }) => {
  useEffect(() => {
    getAllBills();
  }, [getAllBills]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='admin'>
        <h2 className='admin__title'>All Bills</h2>
        <div className='admin__menu'>
          <span>
            <Link to='/admin' exact='true' style={{ color: 'black' }}>
              Admin
            </Link>
          </span>
          <i className='fa fa-chevron-right'></i>
          <span className='admin__menu-home'>All Bills</span>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12 assign'>
              <table className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Custumer</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Perform</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Total bill</th>
                    <th scope='col'>Other</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((value, key) => {
                    return (
                      <tr key={key}>
                        <th>{key + 1}</th>
                        <td>{value.customer_name}</td>
                        <td>{value.customer_phone}</td>
                        <td>{value.user}</td>
                        <td>{value.date}</td>
                        <td>
                          {value.total_price} <strong>$</strong>
                        </td>
                        <td>
                          <Link
                            to={`/billdetail/${value._id}`}
                            className='admin-action'
                          >
                            <i
                              className='fa fa-search-plus'
                              aria-hidden='true'
                            />
                            Detail
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <th>Total bill</th>
                    <th>{bills.length}</th>
                    <th></th>
                    <th></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    bills: state.bill,
  };
};
Allbills.propTypes = {
  bills: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getAllBills })(Allbills);

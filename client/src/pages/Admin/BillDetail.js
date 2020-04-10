import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../scss/admin.scss';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getBillDetail } from './../../actions/mission';
import { Link } from 'react-router-dom';

const BillDetail = ({ getBillDetail, bill: {loading, billDetail}, match }) => {
  useEffect(() => {
    getBillDetail(match.params.id)
  }, [getBillDetail, match.params.id])

  // console.log(bill);
  return loading && billDetail === null ? (<Spinner />) : (
    <Fragment>
      <section className='admin'>
        <h2 className='admin__title'>Bill Detail</h2>
        <div className='admin__menu'>
          <span>
            <Link to='/admin' exact='true' style={{ color: 'black' }}>
              Admin
            </Link>
          </span>
          <i className='fa fa-chevron-right'></i>
          <span className='admin__menu-home'>Bill Detail</span>
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
                  {
                    billDetail ? (
                    <tr>
                      
                      <td>{billDetail.customer_name}</td>
                      <td>{billDetail.customer_phone}</td>
                      <td>{billDetail.user}</td>
                      <td>{billDetail.date}</td>
                      <td>
                        {billDetail.total_price} <strong>$</strong>
                      </td>
                    </tr>
                    ) : ''
                  }  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return {
    bill: state.bill,
  };
};
BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
  getBillDetail: PropTypes.func.isRequired
};
export default connect(mapStateToProps, { getBillDetail })(BillDetail);

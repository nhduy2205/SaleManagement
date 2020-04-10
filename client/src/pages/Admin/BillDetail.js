import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../scss/admin.scss';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getBillDetail } from './../../actions/mission';
import { Link } from 'react-router-dom';

const BillDetail = ({ getBillDetail, bill: { loading, bill }, match }) => {
  useEffect(() => {
    getBillDetail(match.params.id);
  }, [getBillDetail]);

  console.log(bill);
  return loading ? (
    <Spinner />
  ) : (
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
                  {/* <tr>
                    <td>{bill.customer_name}</td>
                    <td>{bill.customer_phone}</td>
                    <td>{bill.user}</td>
                    <td>{bill.date}</td>
                    <td>
                      {bill.total_price} <strong>$</strong>
                    </td>
                  </tr> */}
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
    bill: state.bill,
  };
};
BillDetail.propTypes = {
  bill: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getBillDetail })(BillDetail);

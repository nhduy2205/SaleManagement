import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../scss/admin.scss';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getBillDetail } from './../../actions/mission';
import { Link } from 'react-router-dom';

const BillDetail = ({
  getBillDetail,
  bill: { loading, billDetail },
  auth: { users },
  match,
}) => {
  useEffect(() => {
    getBillDetail(match.params.id);
  }, [getBillDetail, match.params.id]);

  // console.log(users);
  var perform = {};
  if (billDetail !== null) {
    users.map((value, key) => {
      if (value._id === billDetail.user) {
        perform = value;
      }
      return perform;
    });
  }

  // console.log(bill);
  return loading   ? (
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
            <div className='col-6 assign' style={{ margin: '0 auto' }}>
              <table className='table'>
                <thead className='thead-dark'>
                  <tr className='text-center'>
                    <th colSpan='2'>Delivery notes</th>
                  </tr>
                </thead>

                {billDetail ? (
                  <tbody>
                    <tr key={1}>
                      <th scope='col'>Id: </th>
                      <td>{billDetail._id}</td>
                    </tr>
                    <tr key={2}>
                      <th scope='col'>Custumer</th>
                      <td>{billDetail.customer_name}</td>
                    </tr>
                    <tr key={3}>
                      <th scope='col'>Phone</th>
                      <td>{billDetail.customer_phone}</td>
                    </tr>
                    <tr key={4}>
                      <th scope='col'>Perform</th>
                      <td>{perform.name}</td>
                    </tr>
                    <tr key={5}>
                      <th scope='col'>Date</th>
                      <td>{billDetail.date}</td>
                    </tr>
                    <tr key={6}>
                      <th scope='col'>Products</th>
                      <td>
                        {billDetail.bills.map((value, key) => {
                          return (
                            <p key={key}>
                              {value.product}: {value.quantity}x{value.price}{' '}
                              <strong>$</strong>
                            </p>
                          );
                        })}
                      </td>
                    </tr>
                    <tr key={7}>
                      <th scope='col'>Total bill</th>
                      <td>
                        {billDetail.total_price} <strong>$</strong>
                      </td>
                    </tr>
                  </tbody>
                ) : null}
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
    auth: state.auth,
  };
};
BillDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  bill: PropTypes.object.isRequired,
  getBillDetail: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { getBillDetail })(BillDetail);

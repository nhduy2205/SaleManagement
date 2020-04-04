import React, { Fragment, useEffect } from 'react';
import PlanningItem from './PlanningItem';
import PropTypes from 'prop-types';
import Spinner from './../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProduct, planning } from './../../actions/product';
const PlanningDetails = ({
  getAllProduct,
  planning,
  product: { loading, products },
}) => {
  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);

  return loading ? (
    <Spinner />
  ) : (
    <section className='admin'>
      <h2 className='admin__title'>Plan Details</h2>
      <div className='admin__menu'>
        <span>
          <Link to='/admin' exact='true' style={{ color: 'black' }}>
            Admin
          </Link>
        </span>
        <i className='fa fa-chevron-right'></i>
        <span className='admin__menu-home'>Plan Details</span>
      </div>
      <Fragment>
        <table className='table mt-5 container'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Manufacturer</th>
              <th scope='col'>Allocate</th>
              <th scope='col'>Confirm</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, index) => {
              const item = new Object();
              item.name = val.name;
              item.price = val.price;
              item.quantity = document.getElementsByName('soluong').value;
              return (
                <tr>
                  <th scope='row'>{index + 1}</th>
                  <td>
                    <b>{val.name.toUpperCase()}</b>
                  </td>
                  <td>{val.quantity}</td>
                  <td>{val.price} $</td>
                  <td>{val.manufacturer}</td>
                  <td>
                    <input type='text' name='soluong' id='soluong' />
                  </td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={(e) => addItem(item)}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tr>
            <button className='btn btn-success' onClick={(e) => planning(e)}>
              Complete
            </button>
          </tr>
        </table>
      </Fragment>
    </section>
  );
};
const tuihang = [];
const addItem = (e) => {
  tuihang.push(e);
  console.log(tuihang);
};

PlanningDetails.propTypes = {
  getAllProduct: PropTypes.func.isRequired,
  planning: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getAllProduct, planning })(
  PlanningDetails
);

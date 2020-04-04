import React, { Fragment, useEffect } from 'react';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getAllProduct } from './../../actions/product';

const WareHouse = ({ getAllProduct, product: { loading, products } }) => {
  useEffect(() => {
    getAllProduct();
  }, [getAllProduct]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <table className='table mt-5 container'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>STT</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Price</th>
            <th scope='col'>Manufacturer</th>
            <th scope='col'>Add</th>
          </tr>
        </thead>
        <tbody>
          {products.map((val, index) => {
            return <ProductItem key={index} index={index} product={val} />;
          })}
        </tbody>
      </table>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
WareHouse.propTypes = {
  getAllProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getAllProduct })(WareHouse);

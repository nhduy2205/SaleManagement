import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProductItem = ({ product, index }) => {
  return (
    <Fragment>
      <tr>
        <th scope='row'>{index + 1}</th>
        <td>
          <b>{product.name.toUpperCase()}</b>
        </td>
        <td>{product.quantity}</td>
        <td>{product.price} $</td>
        <td>{product.manufacturer}</td>
        <td>
          <input type='text' name='soluong'></input>
        </td>
        <td>
          <button className='btn btn-warning' value='Confirm'>
            Confirm
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default connect(null)(ProductItem);

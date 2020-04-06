import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MissionItem = ({ mission: { product_list } }) => {
  console.log(product_list);
  return (
    <table className='table mt-5 container'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>STT</th>
          <th scope='col'>Product</th>
          <th scope='col'>Price</th>
          <th scope='col'>Sale price/1st</th>
          <th scope='col'>Quantity</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

MissionItem.propTypes = {
  mission: PropTypes.object.isRequired,
};

export default connect(null)(MissionItem);

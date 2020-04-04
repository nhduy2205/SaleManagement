import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PlanItem = ({ user, index }) => {
  return (
    <Fragment>
      <tr>
        <th scope='row'>{index + 1}</th>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>Phong Dien - Can Tho</td>
        <td>
          <button onClick={(e) => onClick(user.name)} value=' Phân công'>
            <i className='fa fa-pencil' aria-hidden='true' />
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

const users = [];
const onClick = (e) => {
  users.push(e);
  console.log(users);
};

PlanItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PlanItem;

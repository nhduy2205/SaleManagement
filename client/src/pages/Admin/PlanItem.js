import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from './../../actions/auth';
import { Link } from 'react-router-dom';
const PlanItem = ({ user, index, deleteUser, missions }) => {
  const findIndex = (arr, i) => {
    var result = -1
    arr.map((val, index) => {
      if(val.user === i){
        result = index
      }
      return result
    })
    return result
  }
  return (
    <Fragment>
      <tr className='tr-0'>
        <th scope='row'>{index + 1}</th>

        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>Can Tho</td>
        <td>
          <Link to={`/plandetails/${user._id}`} className='admin-action'>
            <i className='fa fa-pencil' aria-hidden='true' />
            Assigned
          </Link>
          <a
            href='#/'
            className='admin-action ml-3'
            style={{ color: '#ffc00' }}
            onClick={() => deleteUser(user._id)}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
            Delete
          </a>
        </td>
        <td>
          {
           missions && findIndex(missions, user._id) === -1 ? (<span className="badge badge-danger"><i className="fa fa-calendar-times-o"></i> Chưa phân công</span>)
           : (<span className="badge badge-success"><i className="fa fa-check-square-o" ></i> Đã phân công</span>) }
        </td>
      </tr>
    </Fragment>
  );
};

PlanItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(null, { deleteUser })(PlanItem);

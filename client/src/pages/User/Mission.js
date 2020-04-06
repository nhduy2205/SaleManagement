import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMission } from './../../actions/auth';

const Mission = ({ id_user, getUserMission, auth: { mission } }) => {
  useEffect(() => {
    getUserMission(id_user);
  }, []);

  console.log(mission);
  return (
    <section className='admin'>
      <h2 className='admin__title'>Mission of the day</h2>
      <div className='admin__menu'>
        <span>
          <Link to='/user' exact='true' style={{ color: 'black' }}>
            User
          </Link>
        </span>
        <i className='fa fa-chevron-right'></i>
        <span className='admin__menu-home'>Mission of the day</span>
      </div>
      <Fragment>
        { mission.product_list.forEach((e) => {
            return (
              <tr key={1}>
                <th scope='row'>{1}</th>
                <td>
                  <b>{e.product.toUpperCase()}</b>
                </td>
                <td>{e.quantity}</td>
                <td>{e.price} $</td>
              </tr>
            );
          })};
        )}
      </Fragment>
    </section>
  );
};

Mission.propTypes = {
  getUserMission: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  id_user: state.auth.user._id,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserMission })(Mission);

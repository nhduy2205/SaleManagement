import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMission } from './../../actions/mission';
import Spinner from './../../components/Spinner/Spinner';
const Mission = ({ getUserMission, plan: { mission, loading } }) => {
  useEffect(() => {
    getUserMission();
  }, [getUserMission]);
  const showMission = (e) => {
    if (e != null) {
    
     return e.map((value, index) => {
        console.log(value.product);
        return (
          <tr key={index}>
            <th scope='row'>{index + 1}</th>
            <td>
              <b>{value.product.toUpperCase()}</b>
            </td>
            <td>{value.quantity}</td>
            <td>{value.price} $</td>
          </tr>
        );
        
      });
      
      } else return <tr>No plan to day</tr>;
  };
  console.log(mission);

  return loading && mission === null ? (
    <Spinner />
  ) : (
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
        <table className='table mt-5 container'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>STT</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
              <th scope='col'>Sale price</th>
            </tr>
          </thead>
          <tbody>{showMission(mission.product_list)}</tbody>
        </table>
      </Fragment>
    </section>
  );
};



Mission.propTypes = {
  getUserMission: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  plan: state.mission,
});

export default connect(mapStateToProps, { getUserMission })(Mission);

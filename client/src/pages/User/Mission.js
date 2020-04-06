import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMission } from './../../actions/mission'
import Spinner from './../../components/Spinner/Spinner'
const Mission = ({  getUserMission, mission: { mission, loading } }) => {
  useEffect(() => {
    getUserMission()
    
  }, [getUserMission])

  console.log(mission)
  return loading ? (<Spinner/>) : 
    (
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
        <table>
        {
          
            mission.product_list.map( (e, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{1}</th>
                  <td>
                    <b>{e.product.toUpperCase()}</b>
                  </td>
                  <td>{e.quantity}</td>
                  <td>{e.price} $</td>
                </tr>
              )
            })
          
          
        }
        </table>
        {/* { mission.product_list.forEach((e) => {
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
        )} */}
      </Fragment>
    </section>
  );
};

Mission.propTypes = {
  getUserMission: PropTypes.func.isRequired,
  mission: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  
  mission: state.mission,
});

export default connect(mapStateToProps, { getUserMission })(Mission)

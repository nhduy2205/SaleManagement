import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../../scss/admin.scss';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import PlanItem from './PlanItem';
import {getAllUser} from './../../actions/auth'
import { Redirect, Link } from 'react-router-dom';
import { getAllMission } from '../../actions/mission';

const Admin = ({getAllUser, getAllMission,  auth: { loading, users}, mission: {missions} }) => {
  useEffect(() => {
    getAllUser()
  }, [getAllUser])
  useEffect(() => {
    getAllMission()
  }, [getAllMission])
  const roleUser = users.filter(val => val.role === "user")
  const token = localStorage.getItem('token')
  if(!token){
    return <Redirect to="/" exact />
  }
  
  return loading && users === [] ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='admin'>
        <h2 className="admin__title">Planning</h2>
        <div className="admin__menu">
            <span><Link to="/admin" exact="true" style={{color: "black"}}>Admin</Link></span>
            <i className="fa fa-chevron-right" ></i>
            <span className="admin__menu-home">Planning</span>
        </div>
        <div className='container'>
          
          <div className='row'>
            <div className='col-12 col-lg-12 assign'>
              <table className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>#</th>                    
                    <th scope='col'>Full name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Locality</th>
                    <th scope='col'>Action</th>
                    <th scope='col'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    roleUser.map((val, index) => {
                      return <PlanItem key={index} user={val} index={index} missions={missions}/>
                    })
                  }
                  <tr>
                    <th>Total</th>
                    <th>{users.length - 1}</th>
                    <th></th>
                    <th></th>

                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    mission: state.mission
  };
};
Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  mission: PropTypes.object.isRequired,
  getAllUser: PropTypes.func.isRequired,
  getAllMission: PropTypes.func.isRequired
};
export default connect(mapStateToProps, {getAllUser, getAllMission})(Admin);

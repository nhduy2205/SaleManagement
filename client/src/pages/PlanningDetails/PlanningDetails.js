import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
const PlanningDetails = props => {
    return (
        <section className="admin">
            <h2 className="admin__title">Planning</h2>
            <div className="admin__menu">
            <span><Link to="/admin" exact="true" style={{color: "black"}}>Admin</Link></span>
            <i className="fa fa-chevron-right" ></i>
            <span className="admin__menu-home">Planning</span>
        </div>
        </section>
    )
}

PlanningDetails.propTypes = {

}

export default PlanningDetails

import PropsType from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import './Alert.scss'
const Alert = ({alerts}) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
        
    ))
Alert.PropsType = {
    alerts: PropsType.array.isRequired
}
const mapStateToProps = state => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps, null)(Alert)

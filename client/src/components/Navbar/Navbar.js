import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { logout } from './../../actions/auth';
import jwtDecode from 'jwt-decode';

const Navbar = ({auth: {isAuthenticated}, logout}) => {
    const showLink = () => {
        if(isAuthenticated===null){
            return '';
        }
        else if(isAuthenticated){
            const decoded = jwtDecode(localStorage.getItem('token'))
            console.log(decoded)
            if(decoded.user.role === "admin"){
                return (
                    <nav className="nav justify-content-center">
                      <a className="nav-link active" href="#/">Active link</a>
                      <a className="nav-link" href="#/">Admin</a>
                      <a className="nav-link disabled" href="#/">Disabled link</a>
                    </nav>
                )
      
            }
            else if(decoded.user.role === "user"){
                return (
                    <nav className="nav justify-content-center">
                      <a className="nav-link active" href="#/">Active link</a>
                      <a className="nav-link" href="#/">User</a>
                      <a className="nav-link disabled" href="#/">Disabled link</a>
                    </nav>
                )
            }
        }
    }
    return (
        <Fragment>
            {showLink()}
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navbar)

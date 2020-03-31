import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteUser} from './../../actions/auth'
import {Link} from 'react-router-dom'
const PlanItem = ({user, index, deleteUser}) => {
    return (
        <Fragment>
            <tr className="tr-0">
                <th scope='row'>{index + 1}</th>
                
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Can Tho</td>
                <td>
                    <Link to={`/plandetails/${user._id}`} ><a href='#/' className="admin-action">
                        <i className='fa fa-pencil' aria-hidden='true' />
                        
                            Assigned
                    </a></Link>
                    <a href='#/' className="admin-action ml-3" style={{color: "red"}} onClick={() => deleteUser(user._id)}>
                        <i class="fa fa-window-close" aria-hidden="true"></i>
                        
                            Delete
                    </a>
                </td>
            </tr>
        </Fragment>
    )
}

PlanItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(null, {deleteUser})(PlanItem)

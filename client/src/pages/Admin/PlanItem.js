import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PlanItem = ({user, index}) => {
    return (
        <Fragment>
            <tr>
                <th scope='row'>{index + 1}</th>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Phong Dien - Can Tho</td>
                <td>
                    <a href='#/'>
                        <i className='fa fa-pencil' aria-hidden='true' />
                        Phân công
                    </a>
                </td>
            </tr>
        </Fragment>
    )
}

PlanItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default PlanItem

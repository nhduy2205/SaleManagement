import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PlanItem = props => {
    return (
        <Fragment>
            <tr>
                <th scope='row'>1</th>
                <td>B1605327</td>
                <td>Nguyen Hoang Duy</td>
                <td>22/05/97</td>
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

}

export default PlanItem

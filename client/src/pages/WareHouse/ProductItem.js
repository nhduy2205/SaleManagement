import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProductItem = ({product, index}) => {
    return (
        <Fragment>
            <tr>
                <th scope="row">{index+1}</th>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.manufacturer}</td>
            </tr>
        </Fragment>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired
}

export default ProductItem

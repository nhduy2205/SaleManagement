import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { deleteProduct } from '../../actions/product'
import {connect} from 'react-redux'

const ProductItem = ({product, index, deleteProduct}) => {
    return (
        <Fragment>
            <tr>
                <th scope="row">{index+1}</th>
                <td><b>{product.name.toUpperCase()}</b></td>
                <td>{product.entry_price} $</td>
                <td>{product.entry_quantity} </td>
                <td>{product.quantity_sold} </td>
                <td>{product.quantity_remaining}</td>
                <td>{product.export_price} $</td>
                <td>{product.manufacturer}</td>
                <td><i className="fa fa-trash-o" style={{cursor: "pointer"}}aria-hidden="true" onClick={() => deleteProduct(product._id)}></i></td>
            </tr>
        </Fragment>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    
}


export default connect( null,{deleteProduct})(ProductItem)

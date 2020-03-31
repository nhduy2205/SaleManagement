import React, { Fragment, useEffect } from 'react'
import ProductItem from './ProductItem'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from './../../components/Spinner/Spinner'
import {getAllProduct} from './../../actions/product'
import {Link} from 'react-router-dom'

const WareHouse = ({getAllProduct, product: {loading, products}}) => {
    useEffect(() => {
    getAllProduct()
    }, [getAllProduct])
    const showQuantity = () => {
        var quantity = 0;
        products.map((val, index) => {
            quantity += val.quantity
            return quantity
        })
        return quantity
    }
    const showPrice = () => {
        var price = 0;
        products.map((val, index) => {
            price += val.quantity * val.price
            return price
        })
        return price
    }
    return loading ? (<Spinner/>) :
    (
        <Fragment>
            <section className='admin'>
                <h2 className="admin__title">Warehouse</h2>
                <div className="admin__menu">
                    <span><Link to="/admin" exact="true" style={{color: "black"}}>Admin</Link></span>
                    <i className="fa fa-chevron-right" ></i>
                    <span className="admin__menu-home">Warehouse</span>
                </div>

                <table className="table mt-5 container">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Manufacturer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((val, index) => {
                                return <ProductItem key={index} index={index} product={val}/>
                            })
                        }
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th>{showQuantity()}</th>
                            <th>{showPrice()} $</th>
                            <th></th>
                        </tr>
                        
                    </tbody>
                </table>
            </section>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        product: state.product
    }
}
WareHouse.propTypes = {
    getAllProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getAllProduct})(WareHouse)

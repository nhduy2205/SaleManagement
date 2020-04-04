
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './../../scss/admin.scss';
import {connect} from 'react-redux'
import {addProduct} from './../../actions/product'
import Alert from './../../components/Alert/Alert'
import {Link} from 'react-router-dom'
const AddProduct = ({addProduct}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    manufacturer: ' '
  })
  const {name, price, quantity, manufacturer} = formData
  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    addProduct(formData)

  }
  return (
    <section className='admin'>
      <h2 className="admin__title">Add Product</h2>
      <div className="admin__menu">
          <span><Link to="/admin" exact="true" style={{color: "black"}}>Admin</Link></span>
          <i className="fa fa-chevron-right" ></i>
          <span className="admin__menu-home">Add Product</span>
      </div>
      <div className='container'>
        <div className='admin-title'>THÊM SẢN PHẨM</div>        
        <form className='addproduct' onSubmit={e=> onSubmit(e)}>
          <div className='row'>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Name
                    </span>
                  </div>
                  <input name='name' value={name} onChange={e=> onChange(e)}
                  type='text'
                  className='form-control'
                  placeholder="Product's name"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Price ($)
                    </span>
                  </div>
                  <input name='price' value={price} type='text' onChange={e=> onChange(e)}
                  className='form-control'
                  placeholder="Product's price"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Quantity
                    </span>
                  </div>
                  <input name='quantity' type='number' value={quantity} min="0" max="1000" onChange={e=> onChange(e)}
                  className='form-control'
                  placeholder="Product's quantity"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Manufacturer
                    </span>
                  </div>
                  <input name='manufacturer' value={manufacturer} onChange={e=> onChange(e)}
                  type='text'
                  className='form-control'
                  placeholder="Product's manufacturer"
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      <i className='fa fa-calendar' aria-hidden='true' />
                    </span>
                  </div>
                  <input type='date' className='form-control' placeholder='Username' />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <input name='them' type='submit' className='btn btn-addproduct' value='Add to warehouse' />
              </div>
            </div>
          </div>
        </form>
        <div className="alert-product">
          <Alert />
        </div>
      </div>
      
    
    </section>
  )
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired
}

export default connect(null, {addProduct})(AddProduct)



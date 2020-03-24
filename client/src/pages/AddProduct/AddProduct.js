

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './../../scss/admin.scss';
import {connect} from 'react-redux'
import {addProduct} from './../../actions/product'
import Alert from './../../components/Alert/Alert'
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
      <div className='container'>
        <div className='admin-title'>THÊM SẢN PHẨM</div>        
        <form className='addproduct' onSubmit={e=> onSubmit(e)}>
          <div className='row'>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Tên sản phẩm
                    </span>
                  </div>
                  <input name='name' value={name} onChange={e=> onChange(e)}
                  type='text'
                  className='form-control'
                  placeholder='Tên sản phẩm'
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Giá sản phẩm
                    </span>
                  </div>
                  <input name='price' value={price} type='text' onChange={e=> onChange(e)}
                  className='form-control'
                  placeholder='Giá sản phẩm'
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Số lượng
                    </span>
                  </div>
                  <input name='quantity' type='number' value={quantity} min="0" max="100" onChange={e=> onChange(e)}
                  className='form-control'
                  placeholder='Số lượng'
                  />
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text input-item'>
                      Nhà sản xuất
                    </span>
                  </div>
                  <input name='manufacturer' value={manufacturer} onChange={e=> onChange(e)}
                  type='text'
                  className='form-control'
                  placeholder='Nhà sản xuất'
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
                <input name='them' type='submit' className='btn btn-addproduct' value='Thêm vào kho' />
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



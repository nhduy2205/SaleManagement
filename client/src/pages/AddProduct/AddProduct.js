import React, { Component } from 'react';
import './../../scss/admin.scss';
class AddProduct extends Component {
  render() {
    return (
      <section className='admin'>
        <div className='container'>
          <div className='admin-title'>THÊM SẢN PHẨM</div>
          <form  className='addproduct'>
            <div className='row'>
              <div className='col-12 col-lg-4'>
                <div className='form-group'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text input-item'>
                        Tên sản phẩm
                      </span>
                    </div>
                    <input
                      name='tensp'
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
                    <input
                      name='giasp'
                      type='text'
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
                    <input
                      name='soluong'
                      type='text'
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
                    <input
                      name='nhasanxuat'
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
                    <input
                      type='date'
                      className='form-control'
                      placeholder='Username'
                    />
                  </div>
                </div>
              </div>
              <div className='col-12 col-lg-4'>
                <div className='form-group'>
                  <input
                    name='them'
                    type='submit'
                    className='btn btn-addproduct'
                    value='Thêm vào kho'
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default AddProduct;

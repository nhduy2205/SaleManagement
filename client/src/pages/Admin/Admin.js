import React, { Component } from 'react';
import Menu from '../../components/Menu/Menu';
import './../../scss/admin.scss';
class Admin extends Component {
  render() {
    return (
      <div>
        <section className='admin'>
          <div className='container'>
            <div className='admin-title'>LẬP KẾ HOẠCH</div>
            <div className='row'>
              <div className='col-12 col-lg-9 assign'>
                <table className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>STT</th>
                      <th scope='col'>Mã NV</th>
                      <th scope='col'>Họ tên</th>
                      <th scope='col'>Ngày sinh</th>
                      <th scope='col'>Địa bàn</th>
                      <th scope='col'>Lập kế hoạch</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>1</th>
                      <td>B1605327</td>
                      <td>Nguyen Hoang Duy</td>
                      <td>22/05/97</td>
                      <td>Phong Dien - Can Tho</td>
                      <td>
                        <a href='#'>
                          <i className='fa fa-pencil' aria-hidden='true' />
                          Phân công
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>1</th>
                      <td>B1605327</td>
                      <td>Nguyen Hoang Duy</td>
                      <td>22/05/97</td>
                      <td>Phong Dien - Can Tho</td>
                      <td>
                        <a href='#'>
                          <i className='fa fa-pencil' aria-hidden='true' />
                          Phân công
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope='row'>1</th>
                      <td>B1605327</td>
                      <td>Nguyen Hoang Duy</td>
                      <td>22/05/97</td>
                      <td>Phong Dien - Can Tho</td>
                      <td>
                        <a href='#'>
                          <i className='fa fa-pencil' aria-hidden='true' />
                          Phân công
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-12 col-lg-3 numeral'>
                <div className='card' style={{ width: '18rem' }}>
                  <div className='card-header'>Chỉ số</div>
                  <table>
                    <tbody>
                      <tr>
                        <th>Hoàn thành</th>
                        <td>90%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Admin;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserMission, createBill } from './../../actions/mission';
import Spinner from './../../components/Spinner/Spinner';
const Mission = ({
  getUserMission,
  createBill,
  plan: { mission, loading },
}) => {
  useEffect(() => {
    getUserMission();
  }, [getUserMission]);

  // console.log(today.now());

  const [formData, setformData] = useState({
    customer_name: '',
    customer_phone: '',
  });
  const { customer_name, customer_phone } = formData;
  const setData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.customer_name);
  };

  const submitBill = (e) => {
    e.preventDefault();
    console.log(bills);
    createBill(formData.customer_name, formData.customer_phone, bills);
  };

  return loading && mission === null ? (
    <Spinner />
  ) : (
    <section className='admin'>
      <h2 className='admin__title'>Mission of the day</h2>
      <div className='admin__menu'>
        <span>
          <Link to='/user' exact='true' style={{ color: 'black' }}>
            User
          </Link>
        </span>
        <i className='fa fa-chevron-right'></i>
        <span className='admin__menu-home'>Mission of the day</span>
      </div>
      {/* bill body */}
      <div className='container'>
        <div className='row'>
          <table className='table mt-5 col-9'>
            <tr className='thead-light'>
              <th scope='col'>STT</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Sale price</th>
              <th scope='col'>Consume</th>
            </tr>
            <tbody>{showMission(mission)}</tbody>
          </table>
          <div className='col-3'>
            {' '}
            <div className='card' style={{ width: '18rem' }}>
              <div className='card-header'>Info Customer</div>
              <form onSubmit={(e) => submitBill(e)}>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    <input
                      type='text'
                      placeholder='Name'
                      value={customer_name}
                      name='customer_name'
                      onChange={(e) => setData(e)}
                    />
                  </li>
                  <li className='list-group-item'>
                    <input
                      type='text'
                      placeholder='Phone number'
                      value={customer_phone}
                      name='customer_phone'
                      onChange={(e) => setData(e)}
                    />
                  </li>
                  <li className='list-group-item'>
                    <input
                      type='submit'
                      value='Create'
                      className='btn btn-success'
                    />
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const showMission = (mission) => {
  if (mission !== '') {
    return mission.product_list.map((value, index) => {
      const item = {};
      item.id_product = value.id_product;
      item.product = value.product;
      const onChange = (e) => {
        item.quantity = e.target.value;
      };
      item.price = value.price * 1.2;
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>
            <b>{value.product.toUpperCase()}</b>
          </td>
          <td>{value.quantity}</td>
          <td>{value.price * 1.2} $</td>
          <td>
            <input
              type='text'
              name='sale_quantity'
              onChange={(e) => onChange(e)}
            />
          </td>
          <td>
            <input
              type='button'
              className='btn btn-warning'
              value='Choose'
              onClick={(e) => {
                addBill(item);
              }}
            />
          </td>
        </tr>
      );
    });
  } else
    return (
      <tr>
        <td>
          <b>No plan to day</b>
        </td>
      </tr>
    );
};
var bills = [];

var addBill = (e) => {
  bills.push(e);
  console.log(bills);
};

Mission.propTypes = {
  getUserMission: PropTypes.func.isRequired,
  createBill: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  plan: state.mission,
});

export default connect(mapStateToProps, { getUserMission, createBill })(
  Mission
);

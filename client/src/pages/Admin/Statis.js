import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllBills, getAllMission } from './../../actions/mission';
import Spinner from './../../components/Spinner/Spinner';
import './../../scss/statis.scss';
import './../../scss/admin.scss';

const Statis = ({
  getAllBills,
  getAllMission,
  bill: { bills, loading },
  mission: { missions },
}) => {
  useEffect(() => {
    getAllBills();
    getAllMission();
  }, [getAllBills, getAllMission]);
  console.log(bills);

  var doanhThu = 0;
  var loiNhuan = 0;
  var spBanRa = 0;
  var tongSP = 0;

  // tim tong san pham da duoc phan cong tren tat ca cac user
  if (missions !== null) {
    missions.map((value, key) => {
      value.product_list.map((value, key) => {
        tongSP += value.quantity;
        return tongSP
      });
      return tongSP
    });
  }

  if (bills !== null) {
    bills.map((value, key) => {
      doanhThu += value.total_price;
      loiNhuan += value.total_price - value.total_price / 1.2;

      // tim san pham ban ra
      value.bills.map((value, key) => {
        spBanRa += value.quantity;
        return spBanRa
      });
      return spBanRa
      
    });
  }
  console.log(doanhThu);
  console.log(loiNhuan);
  console.log(spBanRa);
  console.log(tongSP);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='admin'>
        <h2 className='admin__title'>Statistial</h2>
        <div className='admin__menu'>
          <span>
            <Link to='/admin' exact='true' style={{ color: 'black' }}>
              Admin
            </Link>
          </span>
          <i className='fa fa-chevron-right'></i>
          <span className='admin__menu-home'>Statistical</span>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-lg-3 chitiet'>
              <div className='doanhthu'>
                <div className='chiso'>
                  <p>{doanhThu} $</p>
                  <i className='fa fa-signal' aria-hidden='true' />
                </div>
                <h5 className='tieude'>Doanh thu</h5>
              </div>
            </div>
            <div className='col-12 col-lg-3 chitiet'>
              <div className='loinhuan'>
                <div className='chiso'>
                  <p>{loiNhuan} $</p>
                  <i className='fa fa-pie-chart' aria-hidden='true' />
                </div>
                <h5 className='tieude'>Lợi nhuận</h5>
              </div>
            </div>
            <div className='col-12 col-lg-3 chitiet'>
              <div className='tralaikho'>
                <div className='chiso'>
                  <p>{tongSP - spBanRa}</p>
                  <i className='fa fa-truck' aria-hidden='true' />
                </div>
                <h5 className='tieude'>Trả lại kho</h5>
              </div>
            </div>
            <div className='col-12 col-lg-3 chitiet'>
              <div className='tyle'>
                <div className='chiso'>
                  <p>{((spBanRa / tongSP) * 100).toFixed(2)}</p>
                  <i className='fa fa-percent' aria-hidden='true' />
                </div>
                <h5 className='tieude'>Tỷ lệ</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Statis.propTypes = {
  bill: PropTypes.object.isRequired,
  mission: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  bill: state.bill,
  mission: state.mission,
});

export default connect(mapStateToProps, { getAllBills, getAllMission })(Statis);

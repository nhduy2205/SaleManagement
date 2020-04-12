import React, { Fragment, useEffect , useState} from 'react';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner';
import { getProductPagination } from './../../actions/product';
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import Pagination from './../../components/Pagination/Pagination'
const WareHouse = ({ getProductPagination, product: { loading, productspgn } }) => {
  const [filters, setFilters] = useState({
    pageSize: 3,
    pageNo: 1
  })
  
  const paramsString = queryString.stringify(filters)
  useEffect(() => {
    getProductPagination(paramsString);
  }, [getProductPagination, paramsString]);
  const handleChangePage = (newPage) => {
    console.log('NewPage', newPage)
    setFilters({...filters, pageNo: newPage})
  }
  // console.log(products)
  // var total_entry_price = 0;
  // var total_entry_quantity = 0;
  // var total_quantity_sold = 0;
  // var total_quantity_remaining = 0;
  // var total_export_price = 0;
  // products.data.map(val => {
  //   total_entry_price += val.entry_quantity * val.entry_price
  //   return total_entry_price
  // })
  // products.data.map(val => {
  //   total_entry_quantity += val.entry_quantity 
  //   return total_entry_quantity
  // })
  // products.data.map(val => {
  //   total_quantity_sold += val.quantity_sold
  //   return total_quantity_sold
  // })
  // products.data.map(val => {
  //   total_quantity_remaining += val.quantity_remaining
  //   return total_quantity_remaining
  // })
  // products.data.map(val => {
  //   total_export_price += val.quantity_sold * val.export_price
  //   return total_export_price
  // })
  return loading &&  !productspgn ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='admin'>
        <h2 className="admin__title">Warehouse</h2>
        <div className="admin__menu">
            <span><Link to="/admin" exact="true" style={{color: "black"}}>Admin</Link></span>
            <i className="fa fa-chevron-right" ></i>
            <span className="admin__menu-home">Warehouse</span>
        </div>
        
      <table className='table mt-5 container'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Entry_price</th>
            <th scope='col'>Entry_quantity</th> 
            <th scope='col'>Quantity_sold</th> 
            <th scope='col'>Quantity_remaining</th>
            <th scope='col'>Export_price</th>                            
            
            <th scope='col'>Manufacturer</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {productspgn && productspgn.data ? productspgn.data.map((val, index) => {
            return <ProductItem key={index} index={index} product={val} />;
          }) : ''}
          {/* <tr>
            <th>Total</th>
            <th></th>
            <th>{total_entry_price} $</th>
            <th>{total_entry_quantity}</th>
            <th>{total_quantity_sold}</th>
            <th>{total_quantity_remaining}</th>
            <th>{total_export_price} $</th>
            <th></th>
          </tr> */}
        </tbody>
      </table>
      </section>
      <div className="container d-flex justify-content-center">
      <Pagination 
            pagination= { productspgn && productspgn.pagination ? productspgn.pagination : ''}
            onPageChange={handleChangePage}
          /></div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
WareHouse.propTypes = {
  getProductPagination: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProductPagination })(WareHouse);

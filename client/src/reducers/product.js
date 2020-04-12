import {
  ADD_PRODUCT,
  GETALL_PRODUCT,
  DELETE_PRODUCT,
  PLANNING_SUCCESS,
  GETALL_PRODUCT_PAGINATION,
} from './../actions/types';

const InitialState = {
  products: [],
  product: null,
  loading: true,
  isPlanning: false,
  errors: [],
  productspgn: []
};
const product = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case GETALL_PRODUCT:
    
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case GETALL_PRODUCT_PAGINATION:  
      return {
        ...state,
        productspgn: payload,
        loading: false
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((val) => val._id !== payload),
        loading: false,
      };
    case PLANNING_SUCCESS:
      return {
        ...state,
        isPlanning: true,
      };
    default:
      return state;
  }
};
export default product;

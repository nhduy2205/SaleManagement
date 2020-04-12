import { BILLS_LOADED, BILL_DETAIL } from '../actions/types';

const InitialState = {
  bills: null,
  billDetail: null,
  loading: true,
};

const bill = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BILLS_LOADED:
      return {
        ...state,
        loading: false,
        bills: payload,
      };
    case BILL_DETAIL:
      return {
        ...state,
        loading: false,
        billDetail: payload,
      };
    default:
      return state;
  }
};

export default bill;

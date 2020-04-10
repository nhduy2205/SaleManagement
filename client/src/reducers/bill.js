import { BILLS_LOADED, BILL_DETAIL } from '../actions/types';

const InitialState = {
  bills: null,
  bill: null,
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
        bill: payload,
      };
    default:
      return state;
  }
};

export default bill;

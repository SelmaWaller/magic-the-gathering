import {DEBOUNCER} from './../actions/actionTypes';

const initialState = [];

const DebouncerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEBOUNCER:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default DebouncerReducer;

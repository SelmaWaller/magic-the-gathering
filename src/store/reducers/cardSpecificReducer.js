import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './../actions/actionTypes';

const initialState = [];

const CardSpecificReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_RESULTS:
      return {
        ...state,
        ...action,
      };
    case NO_CARD_RESULTS:
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export default CardSpecificReducer;

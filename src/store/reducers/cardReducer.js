import {GET_CARD_RESULTS, NO_CARD_RESULTS} from '../actions/actionTypes';

const initialState = [];

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_RESULTS:
      return {
        ...state,
        ...action,
      };
    case NO_CARD_RESULTS:
      return {
        ...state,
        cards: [],
      };
    default:
      return state;
  }
};

export default CardReducer;

import {combineReducers} from 'redux';
import CardReducer from './cardReducer';
import CardSetsReducer from './cardSetsReducer';
import CardSpecificReducer from './cardSpecificReducer';
import CardInfoReducer from './cardInfoReducer';
import NextCardReducer from './nextCardReducer';
import PreviousCardReducer from './previousCardReducer';

export default combineReducers({
  CardReducer,
  CardSetsReducer,
  CardSpecificReducer,
  CardInfoReducer,
  NextCardReducer,
  PreviousCardReducer,
});

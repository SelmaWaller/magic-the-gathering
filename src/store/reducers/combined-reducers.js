import {combineReducers} from 'redux';
import CardReducer from './cardReducer';
import CardSetsReducer from './cardSetsReducer';
import CardSpecificReducer from './cardSpecificReducer';
import CardInfoReducer from './cardInfoReducer';
import NextCardReducer from './nextCardReducer';
import PreviousCardReducer from './previousCardReducer';
import DebouncerReducer from './debouncerReducer';

export default combineReducers({
  CardReducer,
  CardSetsReducer,
  CardSpecificReducer,
  CardInfoReducer,
  NextCardReducer,
  PreviousCardReducer,
  DebouncerReducer,
});

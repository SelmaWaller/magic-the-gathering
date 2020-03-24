import {combineReducers} from 'redux';
import CardReducer from './cardReducer';
import CardSetsReducer from './cardSetsReducer';
import CardSpecificReducer from './cardSpecificReducer';
import DebouncerReducer from './debouncerReducer';

export default combineReducers({
  CardReducer,
  CardSetsReducer,
  CardSpecificReducer,
  DebouncerReducer,
});

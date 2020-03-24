import {DEBOUNCER} from './actionTypes';

export const DebouncerAction = debouncer => {
  return dispatch => {
    dispatch({
      type: DEBOUNCER,
      debouncer,
    });
  };
};

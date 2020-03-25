import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const CardSetsAction = () => {
  return dispatch => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.scryfall.com/sets/`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          setNames: results.data,
          setCode: results.data.code,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CARD_RESULTS,
        });
      });
  };
};

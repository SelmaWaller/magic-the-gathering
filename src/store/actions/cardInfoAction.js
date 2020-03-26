import {GET_CARD_RESULTS} from './actionTypes';

export const CardInfoAction = currentSet => {
  return dispatch => {
    return fetch(
      `${currentSet ? currentSet : 'https://api.scryfall.com/cards'}`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          setIcon: results.icon_svg_uri,
          lastCardInSet: results.card_count,
        });
      });
  };
};

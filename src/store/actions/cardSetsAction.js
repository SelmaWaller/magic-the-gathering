import {GET_CARD_RESULTS} from './actionTypes';

export const CardSetsAction = setType => {
  return dispatch => {
    return fetch(`${setType}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          setName: results.name,
          setIcon: results.icon_svg_uri,
          cardCount: results.card_count,
        });
      });
  };
};

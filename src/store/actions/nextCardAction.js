import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const NextCardAction = ({set, next, collectorNumber}) => {
  return dispatch => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.scryfall.com/cards/${set}/${
        next ? next : collectorNumber
      }`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          nextCardData: results,
          previewNextCard: results.image_uris.normal,
          nextCardName: results.name,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CARD_RESULTS,
        });
      });
  };
};

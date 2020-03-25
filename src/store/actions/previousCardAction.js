import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const PreviousCardAction = ({set, prev, collectorNumber}) => {
  return dispatch => {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.scryfall.com/cards/${set}/${
        prev ? prev : collectorNumber
      }`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          previousCardData: results,
          previewPrevCard: results.image_uris.normal,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CARD_RESULTS,
        });
      });
  };
};

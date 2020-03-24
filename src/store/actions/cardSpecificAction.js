import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const CardSpecificAction = ({set, collectorNumber}) => {
  return dispatch => {
    return fetch(`https://api.scryfall.com/cards/${set}/${collectorNumber}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          card: results,
          cardName: results.name,
          setUri: results.set_uri,
          next: parseInt(collectorNumber, 10) + 1,
          prev: parseInt(collectorNumber, 10) - 1,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CARD_RESULTS,
        });
      });
  };
};

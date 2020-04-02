import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const CardAction = (set, name) => {
  return dispatch => {
    return fetch(
      `https://api.scryfall.com/cards/search?q=${
        (set === '' || undefined) && name === '' ? 'set:med' : set
      }${name}`
    )
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          cards: results.data,
          set,
          name,
          setName: results.data.set_name,
          setIcon: results.data.icon_svg_uri,
          totalCards: results.total_cards,
        });
      })
      .catch(() => {
        dispatch({
          type: NO_CARD_RESULTS,
          name,
        });
      });
  };
};

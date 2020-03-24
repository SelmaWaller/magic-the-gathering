import {GET_CARD_RESULTS, NO_CARD_RESULTS} from './actionTypes';

export const CardAction = (page, name) => {
  return dispatch => {
    const url =
      name.length > 0
        ? 'https://api.scryfall.com/cards/search'
        : 'https://api.scryfall.com/cards';

    return fetch(`${url}?page=${page}${name.length > 0 ? `&q=${name}` : ''}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        dispatch({
          type: GET_CARD_RESULTS,
          cards: results.data,
          name,
          page,
          toNextPage: results.has_more,
          toPrevPage: page - 1,
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

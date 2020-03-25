import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

import {CardAction} from './../store/actions/cardAction';
import {DebouncerAction} from './../store/actions/debouncerAction';
import {CardSetsAction} from './../store/actions/cardSetsAction';

import Cards from './../components/cards';

function Overview() {
  const dispatch = useDispatch();

  const {setNames} = useSelector(state => state.CardSetsReducer);
  const debouncer = useSelector(state => state.DebouncerReducer.debouncer);
  const {cards} = useSelector(state => state.CardReducer);

  useEffect(() => {
    dispatch(CardSetsAction());
    dispatch(DebouncerAction(debouncer));
    dispatch(CardAction('set:ha2', ''));
  }, [debouncer, dispatch]);

  let handleCharSearch = input => {
    if (debouncer) {
      clearTimeout(debouncer);
    }
    const name = input.target.value.split(' ').join('+');
    const bounce = setTimeout(() => dispatch(CardAction('', name)), 300);
    dispatch(DebouncerAction(bounce));
  };

  return (
    <>
      <Collapsible trigger="Sets (newest to oldest)">
        <div className="setList">
          {setNames ? (
            setNames.map((value, index) => {
              return (
                <div key={index} className="listItem">
                  <img src={value.icon_svg_uri} alt={value.code} />
                  <button
                    key={index}
                    onClick={() => {
                      const queryCode = value.code;
                      dispatch(CardAction(`set:${queryCode}`, ''));
                    }}
                  >
                    <p>{value.name}</p>
                  </button>
                </div>
              );
            })
          ) : (
            <li>
              <ReactLoading
                type={'spinningBubbles'}
                color={'#51a9b6a1'}
                height={30}
                width={30}
              />
            </li>
          )}
        </div>
      </Collapsible>
      <div className="wideCardContainer">
        <div className="postFilter">
          <div>
            <input
              type="text"
              placeholder={`Ex. Ajani, t:bear...`}
              autoFocus
              onChange={handleCharSearch}
            />
          </div>
        </div>
      </div>
      <div className="smallCardContainer overview">
        {cards ? (
          cards.map((value, index) => {
            return (
              <div className="linkedCard cards" key={index}>
                <Cards
                  key={index}
                  id={value.oracle_id}
                  set={value.set}
                  collectorNumber={value.collector_number}
                  name={value.name}
                  image={
                    value.image_uris
                      ? value.image_uris.border_crop
                      : 'https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567'
                  }
                />
              </div>
            );
          })
        ) : (
          <>
            <ReactLoading
              type={'spinningBubbles'}
              color={'#51a9b6a1'}
              height={100}
              width={100}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Overview;

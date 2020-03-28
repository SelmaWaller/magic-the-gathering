import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';

import {CardAction} from './../store/actions/cardAction';

import Cards from './../components/cards';

function Sets() {
  const dispatch = useDispatch();

  const [debounce, setDebounce] = useState();
  const {cards} = useSelector(state => state.CardReducer);

  useEffect(() => {
    dispatch(CardAction('set:ha2', ''));
  }, [dispatch]);

  let handleCharSearch = input => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const name = input.target.value.split(' ').join('+');
    setDebounce(setTimeout(() => dispatch(CardAction('', name)), 300));
  };

  return (
    <>
      <div className="wideCardContainer">
        <div className="searchField">
          <div>
            <input
              type="text"
              placeholder={`Ex. Thassa, t:bear...`}
              autoFocus
              onChange={handleCharSearch}
            />
          </div>
        </div>
      </div>
      <div className="smallCardContainer overview">
        {cards ? (
          cards.slice(0, 50).map((value, index) => {
            //temporary solution until pagination fix
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

export default Sets;

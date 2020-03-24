import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';

import {CardAction} from './../store/actions/cardAction';
import {DebouncerAction} from './../store/actions/debouncerAction';
import Cards from './../components/cards';

function Overview() {
  const dispatch = useDispatch();

  const debouncer = useSelector(state => state.DebouncerReducer.debouncer);
  const {cards, name, page, toNextPage, toPrevPage} = useSelector(
    state => state.CardReducer
  );

  useEffect(() => {
    dispatch(DebouncerAction(debouncer));
    dispatch(CardAction(1, ''));
  }, [debouncer, dispatch]);

  let handleCharSearch = input => {
    if (debouncer) {
      clearTimeout(debouncer);
    }
    const value = input.target.value;
    const bounce = setTimeout(() => dispatch(CardAction(1, value)), 300);
    dispatch(DebouncerAction(bounce));
  };

  let nextPage = () => {
    dispatch(CardAction(page + 1, name));
  };

  let prevPage = () => {
    dispatch(CardAction(page - 1, name));
  };

  return (
    <>
      <div className="wideCardContainer">
        <div className="innerCard postFilter">
          <div>
            <input
              type="text"
              placeholder={`Ex: "Jace"`}
              autoFocus
              onChange={handleCharSearch}
            />
          </div>
          <div className="pages">
            <button
              className={
                toPrevPage !== 0 ? 'activeButton' : 'activeButton__hide'
              }
              disabled={toPrevPage !== 0 ? false : true}
              onClick={prevPage}
            >
              Prev
            </button>

            <button className="currentPage">{page} of a billion</button>
            <button
              className={
                toNextPage !== false ? 'activeButton' : 'activeButton__hide'
              }
              disabled={toNextPage !== false ? false : true}
              onClick={nextPage}
            >
              Next
            </button>
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

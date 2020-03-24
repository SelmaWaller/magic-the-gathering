import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';

import {CardAction} from './../store/actions/cardAction';
import {CardSetsAction} from './../store/actions/cardSetsAction';
import {DebouncerAction} from './../store/actions/debouncerAction';
import Cards from './../components/cards';
import SetNames from './../components/setNames';
import Collapsible from 'react-collapsible';

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
      <div className="wideCardContainer">
        <div className="postFilter">
          <div>
            <input
              type="text"
              placeholder={`Ex. "jace", "t:god"`}
              autoFocus
              onChange={handleCharSearch}
            />
          </div>
          <div className="setCollapsible">
            <Collapsible trigger="Sort by set">
              <div className="iconContainer">
                {setNames ? (
                  setNames.map((value, index) => {
                    return (
                      <div key={index}>
                        <SetNames
                          key={index}
                          setCode={value.code}
                          setIcon={value.icon_svg_uri}
                          setFullName={value.name}
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
            </Collapsible>
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

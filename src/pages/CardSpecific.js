import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CardSpecificAction} from '../store/actions/cardSpecificAction';
import {CardSetsAction} from '../store/actions/cardSetsAction';

import ReactLoading from 'react-loading';

function CardSpecific({
  match: {
    params: {set, collectorNumber},
  },
}) {
  const dispatch = useDispatch();

  const {cardCount, setName, setIcon} = useSelector(
    state => state.CardSetsReducer
  );
  const {card, cardName, setUri, next, prev} = useSelector(
    state => state.CardSpecificReducer
  );

  useEffect(() => {
    dispatch(CardSpecificAction({set, collectorNumber}));
    dispatch(CardSetsAction(setUri));
  }, [collectorNumber, set, setUri, dispatch]);

  const minCard = 1;
  let prevCard = () => {
    collectorNumber >= minCard
      ? (window.location = `/card-specific/${set}/${prev}`)
      : window.location.reload();
  };

  let nextCard = () => {
    collectorNumber <= cardCount
      ? (window.location = `/card-specific/${set}/${next}`)
      : window.location.reload();
  };

  const colorIdentityPattern = /[WUBRG]/;

  return (
    <div className="cardSpecific">
      <div className="setTitle">
        {setIcon ? (
          <img src={setIcon} alt={setName} />
        ) : (
          <div className="setIconLoading">
            <ReactLoading
              type={'spinningBubbles'}
              color={'#51a9b6a1'}
              height={40}
              width={40}
            />
          </div>
        )}
        {setName ? <h2>{setName}</h2> : <h2>&nbsp;&nbsp;&nbsp;Set Name</h2>}
      </div>
      <div className="postFilter">
        <div>
          <button
            disabled={collectorNumber <= minCard ? true : false}
            className={
              collectorNumber >= minCard ? 'prevCard' : 'prevCard__hide'
            }
            onClick={prevCard}
          >
            <span>&#3894;</span>Prev
          </button>
        </div>
        <button className="currentPage">
          {collectorNumber} of {cardCount}
        </button>
        <div>
          <button
            disabled={collectorNumber <= cardCount - 1 ? false : true}
            className={
              collectorNumber <= cardCount ? 'nextCard' : 'nextCard__hide'
            }
            onClick={nextCard}
          >
            Next <span>&#3894;</span>
          </button>
        </div>
      </div>
      <div className="innerCard boxShadow textLeft cardSpecific">
        {card ? (
          <>
            <img
              src={
                card.image_uris
                  ? card.image_uris.normal
                  : 'https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567'
              }
              alt={cardName}
            />
            <div className="cardInfo">
              <h2>{cardName ? cardName : 'Card Name'}</h2>
              <p>{card.oracle_text ? card.oracle_text : 'Oracle text'}</p>
              <p>
                <span>Type: </span>
                {card.type_line ? card.type_line : '-'}
              </p>
              <p>
                <span>Rarity: </span>
                {card.rarity
                  ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)
                  : '-'}
              </p>
              <p>
                <span>Mana cost: </span>
                {card.mana_cost ? card.mana_cost : '-'}
              </p>
              <p>
                <span>Color identity: </span>
                {colorIdentityPattern.test(card.color_identity)
                  ? card.color_identity
                  : '-'}
              </p>
              <p>
                <span>Set type: </span>
                {card.set_type
                  ? card.set_type.charAt(0).toUpperCase() +
                    card.set_type.slice(1)
                  : '-'}
              </p>
              <p>
                <span>Collector number: </span>
                {card.collector_number ? card.collectorNumber : '-'}/
                {cardCount ? cardCount : '-'}
              </p>
              <p>
                <span>Artist: </span>
                {card.artist ? card.artist : '-'}
              </p>
              <p>
                <span>Released: </span>
                {card.released_at ? card.released_at : '-'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="loading">
              <ReactLoading
                type={'spinningBubbles'}
                color={'#51a9b6a1'}
                height={278}
                width={200}
              />
            </div>
            <div className="cardInfo">
              <h2>{cardName}</h2>
              <p>Oracle text</p>
              <p>
                <span>Type: </span>-
              </p>
              <p>
                <span>Rarity: </span>-
              </p>
              <p>
                <span>Mana cost: </span>-
              </p>
              <p>
                <span>Color identity: </span>-
              </p>
              <p>
                <span>Set type: </span>-
              </p>
              <p>
                <span>Collector number: </span>-
              </p>
              <p>
                <span>Artist: </span>-
              </p>
              <p>
                <span>Released: </span>-
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardSpecific;

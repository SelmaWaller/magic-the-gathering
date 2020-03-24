import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CardSpecificAction} from '../store/actions/cardSpecificAction';
import {CardSetsAction} from '../store/actions/cardSetsAction';

import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

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
            Prev
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
            Next
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
              <h2>{cardName}</h2>
              <p>{card.oracle_text}</p>
              <p>
                <span>Type: </span>
                {card.type_line}
              </p>
              <p>
                <span>Rarity: </span>
                {card.card_rarity
                  ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)
                  : '-'}
              </p>
              <p>
                <span>Mana cost: </span>
                {card.mana_cost ? card.mana_cost : '-'}
              </p>
              <p>
                <span>Released: </span>
                {card.released_at}
              </p>
              <p>
                <span>Color identity: </span>
                {card.color_identity === [' '] ? card.color_identity : '-'}
              </p>
              <p>
                <span>Artist: </span>
                {card.artist}
              </p>
              <Collapsible trigger="Set info">
                <p>
                  <span>Set name: </span>
                  {card.set_name}
                </p>
                <p>
                  <span>Set type: </span>
                  {card.set_type}
                </p>
                <p>
                  <span>Collector number: </span>
                  {card.collector_number}
                </p>
              </Collapsible>
            </div>
          </>
        ) : (
          <>
            <div className="loading">
              <ReactLoading
                type={'spinningBubbles'}
                color={'#51a9b6a1'}
                height={140}
                width={140}
              />
            </div>
            <h2>Waiting for data...</h2>
            <p>
              Status: <span>Unknown</span>
            </p>
            <p>
              Species: <span>Unknown</span>
            </p>
            <p>
              Gender: <span>Unknown</span>
            </p>
            <p>
              Origin: <span>Unknown</span>
            </p>
            <p>
              Location: <span>Unknown</span>
            </p>
            <p>
              Created: <span>Unknown</span>
            </p>
            <Collapsible trigger="Episode appearances">
              <p>about</p>
            </Collapsible>
          </>
        )}
      </div>
    </div>
  );
}

export default CardSpecific;

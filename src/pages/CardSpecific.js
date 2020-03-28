import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CardSpecificAction} from '../store/actions/cardSpecificAction';
import {CardInfoAction} from '../store/actions/cardInfoAction';
import {NextCardAction} from '../store/actions/nextCardAction';
import {PreviousCardAction} from '../store/actions/previousCardAction';
import ReactLoading from 'react-loading';

import CardSpecificComponent from './../components/card-specific';

function CardSpecific({
  match: {
    params: {set, collectorNumber},
  },
}) {
  const dispatch = useDispatch();
  const [firstCardInSet] = useState(1);
  const {nextCardData, previewNextCard} = useSelector(
    state => state.NextCardReducer
  );
  const {previousCardData, previewPrevCard} = useSelector(
    state => state.PreviousCardReducer
  );
  const {lastCardInSet, setIcon} = useSelector(state => state.CardInfoReducer);
  const {card, cardName, setUri, setName, next, prev} = useSelector(
    state => state.CardSpecificReducer
  );

  useEffect(() => {
    dispatch(CardSpecificAction({set, collectorNumber}));
    dispatch(CardInfoAction(setUri));
    dispatch(NextCardAction({set, next, collectorNumber}));
    dispatch(PreviousCardAction({set, prev, collectorNumber}));
  }, [next, prev, set, collectorNumber, setUri, dispatch]);

  let prevCard = () => {
    collectorNumber >= firstCardInSet
      ? (window.location = `/card/${set}/${prev}`)
      : window.location.reload();
  };

  let nextCard = () => {
    collectorNumber <= lastCardInSet
      ? (window.location = `/card/${set}/${next}`)
      : window.location.reload();
  };

  const colorIdentityPattern = /[WUBRG]/;

  return (
    <>
      <div className="previewCards">
        <div
          className={`innerCard boxShadow textLeft ${
            collectorNumber <= lastCardInSet - 1
              ? 'previewNextCard'
              : 'previewNextCard__hide'
          }`}
        >
          {nextCardData ? (
            <>
              <img
                src={
                  previewNextCard
                    ? previewNextCard
                    : 'https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567'
                }
                alt={cardName}
              />
            </>
          ) : (
            <img
              src="https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567"
              alt="preview previous"
            />
          )}
        </div>
        <div
          className={`innerCard boxShadow textLeft ${
            collectorNumber <= firstCardInSet
              ? 'previewPrevCard__hide'
              : 'previewPrevCard'
          }`}
        >
          {previousCardData ? (
            <>
              <img
                src={
                  previewPrevCard
                    ? previewPrevCard
                    : 'https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567'
                }
                alt={cardName}
              />
            </>
          ) : (
            <img
              src="https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567"
              alt="preview next"
            />
          )}
        </div>
      </div>
      <div className="contentCard">
        <div className="pageTitle">
          {setIcon ? (
            <img src={setIcon} alt={setName} />
          ) : (
            <div className="pageImgLoading">
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
        <div className="pagination">
          <div>
            <button
              disabled={collectorNumber <= firstCardInSet ? true : false}
              className={
                collectorNumber >= firstCardInSet
                  ? 'prevPage'
                  : 'prevPage__hide'
              }
              onClick={prevCard}
            >
              <span>&#3894;</span>Prev
            </button>
          </div>
          <button className="currentPage">
            {collectorNumber} of{' '}
            {lastCardInSet ? (
              lastCardInSet
            ) : (
              <span className="maxPageLoading">
                {' '}
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#51a9b6a1'}
                  height={15}
                  width={15}
                />
              </span>
            )}
          </button>
          <div>
            <button
              disabled={collectorNumber <= lastCardInSet - 1 ? false : true}
              className={
                collectorNumber <= lastCardInSet ? 'nextPage' : 'nextPage__hide'
              }
              onClick={nextCard}
            >
              Next <span>&#3894;</span>
            </button>
          </div>
        </div>
        <div className="innerCard boxShadow textLeft contentCard">
          {card ? (
            <>
              <CardSpecificComponent
                image={
                  card.image_uris
                    ? card.image_uris.normal
                    : 'https://img.scryfall.com/cards/normal/front/0/5/05e5bb13-d2b1-41fa-9cdf-70efa40455d4.jpg?1579777567'
                }
                name={cardName ? cardName : 'Card Name'}
                oracleText={card.oracle_text}
                type={card.type_line}
                rarity={
                  card.rarity
                    ? card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)
                    : '-'
                }
                manaCost={card.mana_cost}
                colorIdentity={
                  colorIdentityPattern.test(card.color_identity)
                    ? card.color_identity
                    : '-'
                }
                setType={
                  card.set_type
                    ? card.set_type.charAt(0).toUpperCase() +
                      card.set_type.slice(1)
                    : '-'
                }
                collectorNumber={
                  card.collector_number ? card.collector_number : '-'
                }
                artist={card.artist}
                released={card.released_at}
              />
            </>
          ) : (
            <>
              <div className="cardLoading">
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#51a9b6a1'}
                  height={278}
                  width={200}
                />
              </div>
              <div className="cardInfo">
                <CardSpecificComponent />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CardSpecific;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CardSpecificAction} from '../store/actions/cardSpecificAction';
import {CardInfoAction} from '../store/actions/cardInfoAction';
import {NextCardAction} from '../store/actions/nextCardAction';
import {PreviousCardAction} from '../store/actions/previousCardAction';
import ReactLoading from 'react-loading';

import CardSpecificComponent from './../components/card-specific';
import Pagination from './../components/pagination';

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

  const strippedCollectorNumber = collectorNumber.replace(/\D/g, '');

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
          className={`innerCard boxShadow ${
            strippedCollectorNumber <= lastCardInSet - 1
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
          className={`innerCard boxShadow ${
            strippedCollectorNumber <= firstCardInSet
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
                color={'#5494bea1'}
                height={40}
                width={40}
              />
            </div>
          )}
          {setName ? <h2>{setName}</h2> : <h2>&nbsp;&nbsp;&nbsp;Set Name</h2>}
        </div>
        <Pagination
          prevDisabled={
            strippedCollectorNumber <= firstCardInSet ? true : false
          }
          prevClassName={
            strippedCollectorNumber >= firstCardInSet
              ? 'prevPage'
              : 'prevPage__hide'
          }
          toPrev={prevCard}
          currentPage={strippedCollectorNumber}
          lastPage={
            lastCardInSet ? (
              lastCardInSet
            ) : (
              <span className="maxPageLoading">
                {' '}
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#5494bea1'}
                  height={15}
                  width={15}
                />
              </span>
            )
          }
          nextDisabled={
            strippedCollectorNumber <= lastCardInSet - 1 ? false : true
          }
          nextClassName={
            strippedCollectorNumber <= lastCardInSet
              ? 'nextPage'
              : 'nextPage__hide'
          }
          toNext={nextCard}
        />
        <div className="innerCard boxShadow contentCard specificCard">
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
                    : ''
                }
                manaCost={card.mana_cost}
                colorIdentity={
                  colorIdentityPattern.test(card.color_identity)
                    ? card.color_identity
                    : ''
                }
                price={card.prices ? `$${card.prices.usd}` : ''}
                priceFoil={card.prices ? `/ $${card.prices.usd_foil}` : ''}
                collectorNumber={
                  card.collector_number ? card.collector_number : ''
                }
                released={card.released_at}
                artist={card.artist}
              />
            </>
          ) : (
            <>
              <div className="cardLoading">
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#5494bea1'}
                  height={278}
                  width={200}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CardSpecific;

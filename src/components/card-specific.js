import React from 'react';

const CardSpecificComponent = ({
  image,
  name,
  oracleText,
  type,
  rarity,
  manaCost,
  colorIdentity,
  price,
  collectorNumber,
  priceFoil,
  released,
  artist,
}) => {
  return (
    <>
      <img src={image} alt={name} />
      <div className="cardInfo">
        <h2>{name ? name : 'Card Name'}</h2>
        <p>{oracleText ? oracleText : <i>No oracle text for this card</i>}</p>
        <p>
          <span>Type: </span>
          {type ? type : ''}
        </p>
        <p>
          <span>Rarity: </span>
          {rarity ? rarity : ''}
        </p>
        <p>
          <span>Mana cost: </span>
          {manaCost ? manaCost : ''}
        </p>
        <p>
          <span>Color identity: </span>
          {colorIdentity ? colorIdentity : ''}
        </p>
        <p>
          <span>Price (USD): </span>
          {price ? price : ''} {priceFoil ? priceFoil : ''}
        </p>
        <p>
          <span>Collector number: </span>
          {collectorNumber ? collectorNumber : ''}
        </p>
        <p>
          <span>Released: </span>
          {released ? released : ''}
        </p>
        <p>
          <span>Artist: </span>
          {artist ? artist : ''}
        </p>
      </div>
    </>
  );
};

export default CardSpecificComponent;

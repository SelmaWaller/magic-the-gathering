import React from 'react';

import {Link} from 'react-router-dom';

const Cards = ({name, image, set, collectorNumber}) => {
  return (
    <div className="innerCard linkedCard boxShadow cards">
      <Link to={`/card/${set}/${collectorNumber}`}>
        <img src={image} alt={name} title={name} />
      </Link>
    </div>
  );
};

export default Cards;

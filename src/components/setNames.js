import React from 'react';

const SetNames = ({setCode, setIcon, setFullName}) => {
  return (
    <div className="setsList">
      <span>
        <img src={setIcon} alt={setFullName} title={setFullName} />
        <span>{setCode}</span>
      </span>
    </div>
  );
};

export default SetNames;

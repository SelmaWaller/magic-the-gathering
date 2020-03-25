import React from 'react';

import {NavLink} from 'react-router-dom';

const Navigation = ({logout}) => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Overview</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li onClick={logout}>
            <NavLink to="/">Log out</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;

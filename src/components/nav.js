import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';
import {NavLink} from 'react-router-dom';

import {CardAction} from './../store/actions/cardAction';
import {CardSetsAction} from './../store/actions/cardSetsAction';
import Collapsible from 'react-collapsible';

import userImg from './../images/mtglogo.png';
import hamburger from './../images/icons/hamburger.svg';
import sets from './../images/icons/sets.svg';
import user from './../images/icons/user.svg';
import info from './../images/icons/info.svg';
import contact from './../images/icons/contact.svg';

const Navigation = ({logout, currentUser}) => {
  const dispatch = useDispatch();
  const [navIsOpen, setNavIsOpen] = useState(true);

  const {setNames} = useSelector(state => state.CardSetsReducer);

  useEffect(() => {
    dispatch(CardSetsAction());
  }, [dispatch]);

  const toggleNav = () => {
    navIsOpen === true ? setNavIsOpen(false) : setNavIsOpen(true);
  };
  return (
    <>
      <div className={navIsOpen ? 'toggleButton minified' : 'toggleButton'}>
        <ul>
          <li>
            <button onClick={toggleNav} className="menuButton">
              <img src={hamburger} alt="toggle-menu" title="Toggle menu" />
            </button>
          </li>
          <div className={navIsOpen ? 'navIcons' : 'navIcons__hide'}>
            <li>
              <button>
                <img src={user} alt="user" />
              </button>
            </li>
            <li>
              <button>
                <img src={sets} alt="sets" />
              </button>
            </li>
            <li>
              <button>
                <img src={info} alt="about" />
              </button>
            </li>
            <li>
              <button>
                <img src={contact} alt="contact" />
              </button>
            </li>
          </div>
        </ul>
      </div>
      <div className={navIsOpen ? 'toggle__open' : 'toggle__closed'}>
        <div className="userInfo">
          <img src={userImg} alt="userimg" />
          <p>Logged in as {currentUser}</p>
          <p>
            <span onClick={logout}>Switch user</span>
          </p>
        </div>
        <nav className="navbar">
          <ul>
            <NavLink to="/">
              <Collapsible trigger="Sets" open={true}>
                <div className="setList">
                  {setNames ? (
                    setNames.map((value, index) => {
                      return (
                        <div key={index} className="listItem">
                          <img src={value.icon_svg_uri} alt={value.code} />
                          <button
                            key={index}
                            onClick={() => {
                              const queryCode = value.code;
                              dispatch(CardAction(`set:${queryCode}`, ''));
                            }}
                          >
                            <p>{value.name}</p>
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <li>
                      <ReactLoading
                        type={'spinningBubbles'}
                        color={'#51a9b6a1'}
                        height={30}
                        width={30}
                      />
                    </li>
                  )}
                </div>
              </Collapsible>
            </NavLink>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactLoading from 'react-loading';
import {NavLink} from 'react-router-dom';

import {CardAction} from './../store/actions/cardAction';
import {CardSetsAction} from './../store/actions/cardSetsAction';
import Collapsible from 'react-collapsible';

import browseSets from './../images/icons/browse-sets.png';
import hamburger from './../images/icons/hamburger.svg';
import sets from './../images/icons/sets.svg';
import switchUser from './../images/icons/switchUser.svg';
import about from './../images/icons/about.svg';
import contact from './../images/icons/contact.svg';

const Navigation = ({logout}) => {
  const dispatch = useDispatch();
  const [navIsOpen, setNavIsOpen] = useState(true);

  const {setNames} = useSelector(state => state.CardSetsReducer);

  useEffect(() => {
    dispatch(CardSetsAction());
  }, [dispatch]);

  const toggleNav = () => {
    navIsOpen === true ? setNavIsOpen(false) : setNavIsOpen(true);
  };

  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let dd = String(today.getDate()).padStart(2, '0');

  today = `${yyyy}-${mm}-${dd}`;
  return (
    <>
      <div
        className={
          navIsOpen ? 'toggleButton autoClose' : 'toggleButton autoOpen'
        }
      >
        <div className="navIcons">
          <ul>
            <li>
              <button onClick={toggleNav}>
                <img src={hamburger} alt="toggle-menu" title="Toggle menu" />
              </button>
            </li>
            <li>
              <NavLink to="/">
                <button>
                  <img src={sets} alt="sets" title="Home" />
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <button>
                  <img src={about} alt="about" title="About" />
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <button>
                  <img src={contact} alt="contact" title="Contact" />
                </button>
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>
                <img src={switchUser} alt="logout" title="Log out" />
              </button>
            </li>
            <li>
              <button onClick={toggleNav}>
                <img src={browseSets} alt="browseSets" title="Browse sets" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={navIsOpen ? 'toggle__open' : 'toggle__closed'}>
        <nav className="navbar">
          <ul>
            <li>
              <span onClick={toggleNav}>Toggle menu</span>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <span onClick={logout}>Log out</span>
            </li>
            <div className="navCollapsible">
              <Collapsible trigger="Browse sets" open={true}>
                <NavLink to="/">
                  <div className="setList">
                    {setNames ? (
                      setNames.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              value.released_at <= today
                                ? 'listItem'
                                : 'listItem__hide'
                            }
                            title={value.name}
                          >
                            <img src={value.icon_svg_uri} alt={value.code} />
                            <button
                              key={index}
                              onClick={() => {
                                const queryCode = value.code;
                                console.log(value.code);
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
                          color={'#5494bea1'}
                          height={30}
                          width={30}
                        />
                      </li>
                    )}
                  </div>
                </NavLink>
              </Collapsible>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;

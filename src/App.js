import React, {useState} from 'react';
import './scss/styles.scss';

import Login from './pages/Login';
import Navigation from './components/nav';
import Footer from './components/footer';

export default function App({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const currentUser = localStorage.username;

  let updateLogin = () => {
    setIsLoggedIn(true);
  };

  let updateLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
  };

  return localStorage.getItem('token') !== null && isLoggedIn ? (
    <>
      <Navigation currentUser={currentUser} logout={updateLogout} />
      <div className="container">{children}</div>
      <div className="container">
        <Footer />
      </div>
    </>
  ) : (
    <Login updateLoginStatus={updateLogin} />
  );
}

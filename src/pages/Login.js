import React, {useState} from 'react';

import Particles from 'react-particles-js';
import particleSetup from './../components/particles';

export default function Login({updateLoginStatus, updateLogin}) {
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  let handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let username = /^username$/;
    let password = /^password$/;

    switch (name) {
      case 'username':
        username.test(value) ? setUsernameError(false) : setUsernameError(true);
        break;
      case 'password':
        password.test(value) ? setPasswordError(false) : setPasswordError(true);
        break;
      default:
        break;
    }
  };

  let handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('username', 'username');
    localStorage.setItem('password', 'password');
    localStorage.setItem('token', 'faketoken');
    updateLoginStatus();
  };

  return (
    <>
      <Particles
        canvasClassName="particles"
        width="1400px"
        params={particleSetup}
      />
      <div className="loginContainer">
        <div className="loginCard textCenter innerCard boxShadow">
          <form onSubmit={handleSubmit}>
            <h4>
              <label htmlFor="username">
                Username{' '}
                <span className={usernameError ? '' : 'error__hide'}>
                  {' '}
                  (username)
                </span>
              </label>
            </h4>
            <input
              onChange={handleChange}
              id="username"
              type="text"
              name="username"
              placeholder="username"
            />

            <h4>
              <label htmlFor="password">
                Password{' '}
                <span className={passwordError ? '' : 'error__hide'}>
                  {' '}
                  (password)
                </span>
              </label>
            </h4>
            <input
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
            <button
              onClick={updateLogin}
              type="submit"
              disabled={usernameError || passwordError}
              className="loginButton"
            >
              Log in
            </button>
          </form>
          <div className="background"></div>
        </div>
      </div>
    </>
  );
}

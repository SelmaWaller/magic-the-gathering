import React, {useState} from 'react';

const minMessageCount = 15;

export default function Contact() {
  const [firstnameError, setFirstnameError] = useState(true);
  const [surnameError, setSurnameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [messageError, setMessageError] = useState(true);
  const [showResponse, setShowResponse] = useState(false);
  const [count, setCount] = useState(minMessageCount);

  let handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^[a-zA-Zæøå -]+$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let phonePattern = /^[0-9]{1}[0-9]{2}[-. ][0-9]{3}[-. ][0-9]{4}$/;
    let messagePattern = /^(.{15,})$/;

    switch (name) {
      case 'firstname':
        namePattern.test(value)
          ? setFirstnameError(false)
          : setFirstnameError(true);
        break;
      case 'surname':
        namePattern.test(value)
          ? setSurnameError(false)
          : setSurnameError(true);
        break;
      case 'email':
        emailPattern.test(value) ? setEmailError(false) : setEmailError(true);
        break;
      case 'phone':
        phonePattern.test(value) ? setPhoneError(false) : setPhoneError(true);
        break;
      case 'message':
        setCount(minMessageCount - value.length);
        setMessageError(!messagePattern.test(value));
        break;
      default:
        break;
    }
  };

  let submitForm = event => {
    event.preventDefault();
    setShowResponse(true);
  };

  let removeResponse = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="contact">
        <div className="contentCard">
          <div className="pageTitle">
            <h2>Send us a message</h2>
          </div>
          <div className="innerCard boxShadow contactContent">
            <form onSubmit={submitForm}>
              <label htmlFor="firstname">
                First name<span className="required">* </span>
                <span className={firstnameError ? 'error' : 'error__hide'}>
                  {' '}
                  Please use a valid name
                </span>
              </label>
              <input
                autoFocus
                onChange={handleChange}
                id="firstname"
                type="text"
                name="firstname"
                placeholder="John"
              />

              <label htmlFor="surname">
                Last name<span className="required">* </span>
                <span className={surnameError ? 'error' : 'error__hide'}>
                  {' '}
                  Please use a valid name
                </span>
              </label>
              <input
                onChange={handleChange}
                id="surname"
                type="text"
                name="surname"
                placeholder="Doe"
              />

              <label htmlFor="email">
                Email<span className="required">* </span>
                <span className={emailError ? 'error' : 'error__hide'}>
                  {' '}
                  Please enter a valid email
                </span>
              </label>
              <input
                onChange={handleChange}
                id="email"
                type="text"
                name="email"
                placeholder="john@doe.com"
              />

              <label htmlFor="phone">
                Phone<span className="required">* </span>
                <span className={phoneError ? 'error' : 'error__hide'}>
                  {' '}
                  Please enter a 10 digit number
                </span>
              </label>
              <input
                onChange={handleChange}
                id="phone"
                type="text"
                name="phone"
                placeholder="999-999-9999"
              />

              <label htmlFor="message">
                Message<span className="required">* </span>
                <span className={messageError ? 'error' : 'error__hide'}>
                  {' '}
                  Requires {count} more characters
                </span>
              </label>
              <textarea
                onChange={handleChange}
                id="message"
                type="text"
                name="message"
              />

              <button
                className="submitButton"
                type="submit"
                disabled={
                  firstnameError ||
                  surnameError ||
                  emailError ||
                  phoneError ||
                  messageError
                }
              >
                Send
              </button>
              <div
                className={showResponse ? 'messageSent' : 'messageSent__hide'}
              >
                <input readOnly type="text" value="Thank you!" />
                <input
                  readOnly
                  type="text"
                  value="Send another message"
                  onClick={removeResponse}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

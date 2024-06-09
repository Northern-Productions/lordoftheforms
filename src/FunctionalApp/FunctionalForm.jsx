import { useState, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setValidUserData, setUserData }) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameValid = firstNameInput.length >= 2;
  const isLastNameValid = lastNameInput.length >= 2;
  const isPhoneNumberValid = phoneInputState.join("").length === 7;

  const shouldShowFirstNameError = isSubmitted && !isFirstNameValid;
  const shouldShowLastNameError = isSubmitted && !isLastNameValid;
  const shouldShowEmailError = isSubmitted && !isEmailValid(emailInput);
  const shouldShowCityError = isSubmitted && !allCities.includes(cityInput);
  const shouldShowPhoneNumberError = isSubmitted && !isPhoneNumberValid;

  const allValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid(emailInput) &&
    allCities.includes(cityInput) &&
    isPhoneNumberValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (allValid) {
      setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityInput,
        phone: phoneInputState.join("-"),
      });
      setValidUserData(true);
    } else {
      alert("Bad Input");
    }
  };

  const phoneInputHandler = (index) => (e) => {
    const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
      index === phoneInputIndex ? e.target.value : phoneInput
    );
    setPhoneInputState(newState);
  };

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const handleInput = (e, nextInput) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
    } else if (value.length >= e.target.maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

  const handleBackspace = (e, prevInput) => {
    if (
      e.target.value.length === 0 &&
      (e.key === "Backspace" || e.key === "Delete") &&
      prevInput
    ) {
      prevInput.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          type="text"
          placeholder="Bilbo"
          value={firstNameInput}
          onChange={(e) => setFirstNameInput(e.target.value)}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          type="text"
          placeholder="Baggins"
          value={lastNameInput}
          onChange={(e) => setLastNameInput(e.target.value)}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          type="email"
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
        />
      </div>
      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          type="text"
          list="allCities"
          placeholder="Hobbiton"
          value={cityInput}
          onChange={(e) => {
            setCityInput(e.target.value);
          }}
        />
        <datalist id="allCities">
          {allCities.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
      </div>
      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            ref={input1}
            type="tel"
            maxLength={2}
            onKeyDown={(e) => handleBackspace(e, null)}
            onInput={(e) => handleInput(e, input2)}
            value={phoneInputState[0]}
            onChange={phoneInputHandler(0)}
            id="phone-input-1"
            placeholder="55"
          />
          -
          <input
            ref={input2}
            type="tel"
            maxLength={2}
            onKeyDown={(e) => handleBackspace(e, input1)}
            onInput={(e) => handleInput(e, input3)}
            value={phoneInputState[1]}
            onChange={phoneInputHandler(1)}
            id="phone-input-2"
            placeholder="55"
          />
          -
          <input
            ref={input3}
            type="tel"
            maxLength={2}
            onKeyDown={(e) => handleBackspace(e, input2)}
            onInput={(e) => handleInput(e, input4)}
            value={phoneInputState[2]}
            onChange={phoneInputHandler(2)}
            id="phone-input-3"
            placeholder="55"
          />
          -
          <input
            ref={input4}
            type="tel"
            maxLength={1}
            onKeyDown={(e) => handleBackspace(e, input3)}
            onInput={(e) => handleInput(e, null)}
            value={phoneInputState[3]}
            onChange={phoneInputHandler(3)}
            id="phone-input-4"
            placeholder="5"
          />
        </div>
      </div>

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

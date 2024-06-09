import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
      isSubmitted: false,
      allValid: false,
    };

    this.input1 = createRef();
    this.input2 = createRef();
    this.input3 = createRef();
    this.input4 = createRef();
  }

  setFirstNameInput = (value) => {
    this.setState({ firstNameInput: value });
  };

  setLastNameInput = (value) => {
    this.setState({ lastNameInput: value });
  };

  setEmailInput = (value) => {
    this.setState({ emailInput: value });
  };

  setCityInput = (value) => {
    this.setState({ cityInput: value });
  };

  setPhoneInputState = (value) => {
    this.setState({ phoneInputState: value });
  };

  setIsSubmitted = (value) => {
    this.setState({ isSubmitted: value });
  };

  validateFirstName = () => {
    if (this.state.firstNameInput.length >= 2) {
      return true;
    }
    return false;
  };

  validateLastName = () => {
    if (this.state.lastNameInput.length >= 2) {
      return true;
    }
    return false;
  };

  validateEmail = () => {
    if (isEmailValid(this.state.emailInput)) {
      return true;
    }
    return false;
  };

  validateCity = () => {
    if (allCities.includes(this.state.cityInput)) {
      return true;
    }
    return false;
  };

  validatePhone = () => {
    if (this.state.phoneInputState.join("").length === 7) {
      return true;
    }
    return false;
  };

  allValid = () => {
    return (
      this.validateFirstName() &&
      this.validateLastName() &&
      this.validateEmail() &&
      this.validateCity() &&
      this.validatePhone()
    );
  };

  shouldShowFirstNameError = () => {
    return this.state.isSubmitted && !this.validateFirstName();
  };

  shouldShowLastNameError = () => {
    return this.state.isSubmitted && !this.validateLastName();
  };

  shouldShowEmailError = () => {
    return this.state.isSubmitted && !this.validateEmail();
  };

  shouldShowCityError = () => {
    return this.state.isSubmitted && !this.validateCity();
  };

  shouldShowPhoneNumberError = () => {
    return this.state.isSubmitted && !this.validatePhone();
  };

  phoneInputHandler = (index) => (e) => {
    const newState = this.state.phoneInputState.map(
      (phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
    );
    this.setState({ phoneInputState: newState });
  };

  handleInput = (e, nextInput) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.slice(0, -1);
    } else if (value.length >= e.target.maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

  handleBackspace = (e, prevInput) => {
    if (
      e.target.value.length === 0 &&
      (e.key === "Backspace" || e.key === "Delete") &&
      prevInput
    ) {
      prevInput.current.focus();
    }
  };

  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    if (this.allValid()) {
      this.props.setUserData({
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        email: this.state.emailInput,
        city: this.state.cityInput,
        phone: this.state.phoneInputState.join("-"),
      });
      this.props.setValidUserData(true);
    } else {
      alert("Bad Input");
    }
  };

  render() {
    return (
      <form onSubmit={this.handelSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <label>{"First Name"}:</label>
          <input
            type="text"
            placeholder="Bilbo"
            value={this.state.firstNameInput}
            onChange={(e) => this.setFirstNameInput(e.target.value)}
          />
        </div>
        <ErrorMessage
          message={firstNameErrorMessage}
          show={this.shouldShowFirstNameError()}
        />

        {/* last name input */}
        <div className="input-wrap">
          <label>{"Last Name"}:</label>
          <input
            type="text"
            placeholder="Baggins"
            value={this.state.lastNameInput}
            onChange={(e) => this.setLastNameInput(e.target.value)}
          />
        </div>
        <ErrorMessage
          message={lastNameErrorMessage}
          show={this.shouldShowLastNameError()}
        />

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input
            type="email"
            placeholder="bilbo-baggins@adventurehobbits.net"
            value={this.state.emailInput}
            onChange={(e) => this.setEmailInput(e.target.value)}
          />
        </div>
        <ErrorMessage
          message={emailErrorMessage}
          show={this.shouldShowEmailError()}
        />

        {/* City Input */}
        <div className="input-wrap">
          <label>{"City"}:</label>
          <input
            type="text"
            list="allCities"
            placeholder="Hobbiton"
            value={this.cityInput}
            onChange={(e) => this.setCityInput(e.target.value)}
          />
        </div>
        <ErrorMessage
          message={cityErrorMessage}
          show={this.shouldShowCityError()}
        />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input
              ref={this.input1}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, null)}
              onInput={(e) => this.handleInput(e, this.input2)}
              value={this.state.phoneInputState[0]}
              onChange={this.phoneInputHandler(0)}
              id="phone-input-1"
              placeholder="55"
            />
            -
            <input
              ref={this.input2}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, this.input1)}
              onInput={(e) => this.handleInput(e, this.input3)}
              value={this.state.phoneInputState[1]}
              onChange={this.phoneInputHandler(1)}
              id="phone-input-2"
              placeholder="55"
            />
            -
            <input
              ref={this.input3}
              type="tel"
              maxLength={2}
              onKeyDown={(e) => this.handleBackspace(e, this.input2)}
              onInput={(e) => this.handleInput(e, this.input4)}
              value={this.state.phoneInputState[2]}
              onChange={this.phoneInputHandler(2)}
              id="phone-input-3"
              placeholder="55"
            />
            -
            <input
              ref={this.input4}
              type="tel"
              maxLength={1}
              onKeyDown={(e) => this.handleBackspace(e, this.input3)}
              onInput={(e) => this.handleInput(e, null)}
              value={this.state.phoneInputState[3]}
              onChange={this.phoneInputHandler(3)}
              id="phone-input-4"
              placeholder="5"
            />
          </div>
        </div>

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={this.shouldShowPhoneNumberError()}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassNameInput } from "./ClassNameInput";
import { ClassEmailInput } from "./ClassEmailInput";
import { isEmailValid } from "../utils/validations";
import { ClassCityInput } from "./ClassCityInput";
import { allCities } from "../utils/all-cities";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameInputState: "",
      lastNameInputState: "",
      emailInputState: "",
      cityInputState: "",
      phoneInputState: ["", "", "", ""],
      isSubmitted: false,
      allValid: false,
    };
  }

  setFirstNameInputState = (value) => {
    this.setState({ firstNameInputState: value });
  };

  setLastNameInputState = (value) => {
    this.setState({ lastNameInputState: value });
  };

  setEmailInputState = (value) => {
    this.setState({ emailInputState: value });
  };

  setCityInputState = (value) => {
    this.setState({ cityInputState: value });
  };

  setPhoneInputState = (value) => {
    this.setState({ phoneInputState: value });
  };

  setIsSubmitted = (value) => {
    this.setState({ isSubmitted: value });
  };

  validateFirstName = () => {
    if (this.state.firstNameInputState.length >= 2) {
      return true;
    }
    return false;
  };

  validateLastName = () => {
    if (this.state.lastNameInputState.length >= 2) {
      return true;
    }
    return false;
  };

  validateEmail = () => {
    if (isEmailValid(this.state.emailInputState)) {
      return true;
    }
    return false;
  };

  validateCity = () => {
    if (allCities.includes(this.state.cityInputState)) {
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

  resetForm = () => {
    this.setState({
      firstNameInputState: "",
      lastNameInputState: "",
      emailInputState: "",
      cityInputState: "",
      phoneInputState: ["", "", "", ""],
      isSubmitted: false,
    });
  };

  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    if (!this.allValid()) {
      alert("Bad Input");
    } else {
      this.props.setUserData({
        firstName: this.state.firstNameInputState,
        lastName: this.state.lastNameInputState,
        email: this.state.emailInputState,
        city: this.state.cityInputState,
        phone: this.state.phoneInputState.join(""),
      });
      this.props.setValidUserData(true);
      this.resetForm();
    }
  };

  render() {
    return (
      <form onSubmit={this.handelSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassNameInput
          label={"First Name"}
          type={"text"}
          placeholder={"Bilbo"}
          value={this.state.firstNameInputState}
          setValue={this.setFirstNameInputState}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={this.shouldShowFirstNameError()}
        />

        {/* last name input */}
        <ClassNameInput
          label={"Last Name"}
          type={"text"}
          placeholder={"Baggins"}
          value={this.state.lastNameInputState}
          setValue={this.setLastNameInputState}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={this.shouldShowLastNameError()}
        />

        {/* Email Input */}
        <ClassEmailInput
          emailInputState={this.state.emailInputState}
          setEmailInputState={this.setEmailInputState}
        />
        <ErrorMessage
          message={emailErrorMessage}
          show={this.shouldShowEmailError()}
        />

        {/* City Input */}
        <ClassCityInput
          cityInputState={this.state.cityInputState}
          setCityInputState={this.setCityInputState}
        />
        <ErrorMessage
          message={cityErrorMessage}
          show={this.shouldShowCityError()}
        />

        <ClassPhoneInput
          phoneInputState={this.state.phoneInputState}
          setPhoneInputState={this.setPhoneInputState}
        />
        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={this.shouldShowPhoneNumberError()}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

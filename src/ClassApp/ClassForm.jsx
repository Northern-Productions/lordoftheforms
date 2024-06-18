import { Component } from "react";
import { ClassTextInput } from "./ClassTextInput";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
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
    if (isCityValid(this.state.cityInputState)) {
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
        <ClassTextInput
          inputProps={{
            id: "First Name",
            placeholder: "Bilbo",
            value: this.state.firstNameInputState,
          }}
          updateStateFunction={this.setFirstNameInputState}
          shouldErrorShowUp={this.shouldShowFirstNameError()}
          errorMessageText={firstNameErrorMessage}
        />

        {/* last name input */}
        <ClassTextInput
          inputProps={{
            id: "Last Name",
            placeholder: "Baggins",
            value: this.state.lastNameInputState,
          }}
          updateStateFunction={this.setLastNameInputState}
          shouldErrorShowUp={this.shouldShowLastNameError()}
          errorMessageText={lastNameErrorMessage}
        />

        {/* Email Input */}
        <ClassTextInput
          inputProps={{
            id: "Email",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: this.state.emailInputState,
          }}
          updateStateFunction={this.setEmailInputState}
          shouldErrorShowUp={this.shouldShowEmailError()}
          errorMessageText={emailErrorMessage}
        />

        {/* City Input */}
        <ClassTextInput
          inputProps={{
            id: "City",
            placeholder: "Hobbiton",
            value: this.state.cityInputState,
            list: "cities",
          }}
          updateStateFunction={this.setCityInputState}
          shouldErrorShowUp={this.shouldShowCityError()}
          errorMessageText={cityErrorMessage}
        />

        {/* Phone Input */}
        <ClassPhoneInput
          phoneInputState={this.state.phoneInputState}
          setPhoneInputState={this.setPhoneInputState}
          shouldErrorShowUp={this.shouldShowPhoneNumberError()}
          errorMessageText={phoneNumberErrorMessage}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

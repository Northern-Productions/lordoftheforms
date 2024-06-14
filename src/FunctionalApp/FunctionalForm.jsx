import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalNameInput } from "./FunctionalNameInput";
import { FunctionalEmailInput } from "./FunctionalEmailInput";
import { isEmailValid } from "../utils/validations";
import { FunctionalCityInput } from "./FunctionalCityInput";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { isPhoneValid } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setValidUserData, setUserData }) => {
  const [firstNameInputState, setFirstNameInputState] = useState("");
  const [lastNameInputState, setLastNameInputState] = useState("");
  const [emailInputState, setEmailInputState] = useState("");
  const [cityInputState, setCityInputState] = useState("");
  const [phoneInputState, setPhoneInputState] = useState(["", "", "", ""]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstNameValid = firstNameInputState.length >= 2;
  const isLastNameValid = lastNameInputState.length >= 2;
  const isPhoneNumberValid = isPhoneValid(phoneInputState);

  const shouldShowFirstNameError = isSubmitted && !isFirstNameValid;
  const shouldShowLastNameError = isSubmitted && !isLastNameValid;
  const shouldShowEmailError = isSubmitted && !isEmailValid(emailInputState);
  const shouldShowCityError =
    isSubmitted && !isCityValid(allCities, cityInputState);
  const shouldShowPhoneNumberError = isSubmitted && !isPhoneNumberValid;

  const allValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid(emailInputState) &&
    isCityValid(allCities, cityInputState) &&
    isPhoneNumberValid;

  const resetForm = () => {
    setFirstNameInputState("");
    setLastNameInputState("");
    setEmailInputState("");
    setCityInputState("");
    setPhoneInputState(["", "", "", ""]);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!allValid) {
      alert("Bad Input");
    } else {
      setUserData({
        firstName: firstNameInputState,
        lastName: lastNameInputState,
        email: emailInputState,
        city: cityInputState,
        phone: phoneInputState.join("-"),
      });
      setValidUserData(true);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalNameInput
        label="First Name"
        type="text"
        placeholder="Bilbo"
        value={firstNameInputState}
        setValue={setFirstNameInputState}
      />

      <ErrorMessage
        message={firstNameErrorMessage}
        show={shouldShowFirstNameError}
      />

      {/* last name input */}
      <FunctionalNameInput
        label="Last Name"
        type="text"
        placeholder="Baggins"
        value={lastNameInputState}
        setValue={setLastNameInputState}
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={shouldShowLastNameError}
      />

      {/* Email Input */}
      <FunctionalEmailInput
        emailInputState={emailInputState}
        setEmailInputState={setEmailInputState}
      />
      <ErrorMessage message={emailErrorMessage} show={shouldShowEmailError} />

      {/* City Input */}
      <FunctionalCityInput
        cityInputState={cityInputState}
        setCityInputState={setCityInputState}
      />
      <ErrorMessage message={cityErrorMessage} show={shouldShowCityError} />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneInputState={phoneInputState}
        setPhoneInputState={setPhoneInputState}
      />
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={shouldShowPhoneNumberError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

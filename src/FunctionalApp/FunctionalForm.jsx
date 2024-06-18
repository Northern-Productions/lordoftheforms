import { useState } from "react";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { isPhoneValid } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setUserData }) => {
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
  const shouldShowCityError = isSubmitted && !isCityValid(cityInputState);
  const shouldShowPhoneNumberError = isSubmitted && !isPhoneNumberValid;

  const allValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid(emailInputState) &&
    isCityValid(cityInputState) &&
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
        phone: phoneInputState.join(""),
      });
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        inputProps={{
          id: "First Name",
          placeholder: "Bilbo",
          value: firstNameInputState,
        }}
        updateStateFunction={setFirstNameInputState}
        errorMessageText={firstNameErrorMessage}
        shouldErrorShowUp={shouldShowFirstNameError}
      />

      {/* last name input */}
      <FunctionalTextInput
        inputProps={{
          id: "Last Name",
          placeholder: "Baggins",
          value: lastNameInputState,
        }}
        updateStateFunction={setLastNameInputState}
        errorMessageText={lastNameErrorMessage}
        shouldErrorShowUp={shouldShowLastNameError}
      />

      {/* Email Input */}
      <FunctionalTextInput
        inputProps={{
          id: "Email",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: emailInputState,
        }}
        updateStateFunction={setEmailInputState}
        errorMessageText={emailErrorMessage}
        shouldErrorShowUp={shouldShowEmailError}
      />

      {/* City Input */}
      <FunctionalTextInput
        inputProps={{
          id: "City",
          placeholder: "Hobbiton",
          value: cityInputState,
          list: "cities",
        }}
        updateStateFunction={setCityInputState}
        errorMessageText={cityErrorMessage}
        shouldErrorShowUp={shouldShowCityError}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneInputState={phoneInputState}
        setPhoneInputState={setPhoneInputState}
        errorMessageText={phoneNumberErrorMessage}
        ShouldErrorShowUp={shouldShowPhoneNumberError}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

import { allCities } from "./all-cities";

export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(input) {
  const lowerCaseCities = allCities.map((city) => city.toLowerCase());
  return lowerCaseCities.includes(input.toLowerCase());
}

export function isPhoneValid(phoneInput) {
  return phoneInput.join("").length === 7;
}

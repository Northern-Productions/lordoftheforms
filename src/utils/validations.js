export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(cities, input) {
  return cities.includes(input);
}

export function isPhoneValid(phoneInput) {
  return phoneInput.join("").length === 7;
}

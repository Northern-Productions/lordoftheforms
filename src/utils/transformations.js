export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (str) => {
  let formattedPhoneNumber = "";
  for (let i = 0; i < str.length; i++) {
    if (i !== 0 && i % 2 === 0) {
      formattedPhoneNumber += "-";
    }
    formattedPhoneNumber += str[i];
  }
  return formattedPhoneNumber;
};

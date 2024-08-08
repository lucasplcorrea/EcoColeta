const getGoogleMapsLink = ([longitude, latitude]) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };
  
  module.exports = { getGoogleMapsLink };
  
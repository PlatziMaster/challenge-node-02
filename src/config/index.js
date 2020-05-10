require('dotenv').config();

const config = {
  twilioSID: process.env.TWILIO_SID,
  twilioToken: process.env.TWILIO_TOKEN,
  numOrigin: process.env.NUM_ORIGIN,
  numDestination: process.env.NUM_DESTINATION,
};

module.exports = config ;
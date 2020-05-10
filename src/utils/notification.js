const config  = require('../config');
const client = require('twilio')(config.twilioSID, config.twilioToken);

const sendSMS = async (record) => {
    const messaege = await client.messages
        .create({ body: `Hola la temperatura actual en poza rica es ${record}`, from: `+${config.numOrigin}`, to: `+${config.numDestination}` })
    console.log(messaege.sid);
}


module.exports = sendSMS;
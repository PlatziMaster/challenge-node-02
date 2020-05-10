const accountSid = 'accountSid,';
const authToken = 'authToken,';
const client = require('twilio')(accountSid, authToken);

const sendSMS = (record) => {
    const messaege = await client.messages
        .create({ body: `Hola la temperatura actual en poza rica es ${value}`, from: '+numOrigin,', to: '+numDestination,' })
    console.log(messaege.sid);
}


module.exports = sendSMS;
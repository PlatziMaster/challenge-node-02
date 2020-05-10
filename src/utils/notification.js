const accountSid = 'accountSid,';
const authToken = 'authToken,';
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (record) => {
    const messaege = await client.messages
        .create({ body: `Hola la temperatura actual en poza rica es ${record}`, from: '+numOrigin,', to: '+numDestination,' })
    console.log(messaege.sid);
}


module.exports = sendSMS;
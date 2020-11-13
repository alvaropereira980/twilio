const config = require('../config');
const client = require('twilio')(config.accountSid, config.autToken);

/**
 * Send a SMS message
 * @param {string} body - the body message
 * @param {string} phone - the target phone number
 **/
async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({
            to: phone,
            from: config.twilioPhone,
            body: body
        });
        return message;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {sendMessage};

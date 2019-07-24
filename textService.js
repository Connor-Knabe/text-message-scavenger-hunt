const login = require('./login.js');
const twilio = require('twilio');
const client = twilio(login.twilioSID, login.twilioKay);

module.exports = logger => {
    function sendMessage(toNumber, msg) {
        if (Object.prototype.toString.call(toNumber) === '[object Array]') {
            for (var i = 0; i < toNumber.length; i++) {
                sendText(toNumber[i], msg);
            }
        } else {
            sendText(toNumber, msg);
        }
    }

    function sendText(number, msg) {
        client.messages.create(
            {
                to: number,
                from: login.fromNumber,
                body: msg
            },
            (err, messageRes) => {
                if (err) {
                    logger.error('Error sending txt: ', err);
                } else {
                    logger.debug(`Sent msg ${msg} to ${number}`);
                }
            }
        );
    }

    return {
        sendMessage: sendMessage
    };
};

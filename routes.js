const login = require('./login.js');

module.exports = (app, logger, textService) => {
	const textMessages = require('./textMessages.js');

	app.get('/health', (req, res) => {
		res.status(200);
		res.send('healthy');
	});

	app.post('/sms', function(req, res) {
		var incomingPhoneNumber = req.body.From;

		var msg = {
			sid: req.body.MessageSid,
			type: 'text',
			textMessage: req.body.Body,
			fromCity: req.body.FromCity,
			fromState: req.body.FromState,
			fromCountry: req.body.FromCountry
		};
		logger.info(`SMS containing: "${msg.textMessage}". Recieved from: ${incomingPhoneNumber}`);

		var textString = msg.textMessage.toLowerCase();
		if (containsValidString(textString)) {
			if (containsValidTimeRange(textString)) {
				var splitMsg = textString.split(' ');
				var hintNumber = splitMsg[2] - 1;

				var hint = textMessages.clues[splitMsg[1]][hintNumber];
				var txtMsg = `Here's your hint ${hint}`;

				textService.sendMessage(incomingPhoneNumber, txtMsg);
			} else {
				var txtMsg = 'No cheating! You cannot access hints for days in the future. Or days outside of the 15th and 24th.';
				textService.sendMessage(incomingPhoneNumber, txtMsg);
			}
		} else {
			var txtMsg = 'Unrecognized command: "' + msg.textMessage + '" Please type hint day of month(14-24) number (1-3).  For example "hint 15 2" to get the 2nd hint for day 15';
			textService.sendMessage(incomingPhoneNumber, txtMsg);
		}

		res.status(204);
		res.send('No content');
	});
	function containsValidString(str) {
		str = str.split(' ');
		var isValid = false;
		if (str.length == 3 && str[0] == 'hint' && str[2] < 4 && str[1] < 31) {
			isValid = true;
		}
		return isValid;
	}

	function containsValidTimeRange(str) {
		str = str.split(' ');
		var isValid = false;
		var currentDay = new Date().getDate();
		//DEBUG SET TO 15 NOT 10
		if (str[1] <= currentDay && str[1] >= 15 && str[1] < 25) {
			isValid = true;
		}
		return isValid;
	}
	return;
};

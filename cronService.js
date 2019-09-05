var CronJob = require('cron').CronJob;
const textMessages = require('./textMessages.js');
const login = require('./login.js');

module.exports = (textService) => {
	for (var dayOfMonth in textMessages.greetings) {
		if (textMessages.greetings.hasOwnProperty(dayOfMonth)) {
			var firstGreeting = textMessages.greetings[dayOfMonth][0];
			setupCron(12, dayOfMonth, firstGreeting);
		}
		if (textMessages.greetings.hasOwnProperty(dayOfMonth)) {
			var secondGreeting = textMessages.greetings[dayOfMonth][1];
			setupCron(15, dayOfMonth, secondGreeting);
		}
		if (textMessages.greetings.hasOwnProperty(dayOfMonth)) {
			var thirdGreeting = textMessages.greetings[dayOfMonth][2];
			setupCron(20, dayOfMonth, thirdGreeting);
		}

		if (textMessages.clues.hasOwnProperty(dayOfMonth)) {
			var firstClue = textMessages.clues[dayOfMonth][0];
			setupCron(9, dayOfMonth, 'First clue: ' + firstClue);
		}
	}
	function setupCron(hourOfDay, dayOfMonth, message) {
		new CronJob(
			`00 50 ${hourOfDay} ${dayOfMonth} * *`,
			() => {
				//remove comment to reenable
				//textService.sendMessage(login.numberArray[0], message);
			},
			() => {
				/* This function is executed when the job stops */
			},
			true /* Start the job right now */,
			'America/Chicago'
		);
	}

	//change me to the 15th!
	new CronJob(
		`00 45 8 15 * *`,
		() => {
			//remove comment to reenable
			//textService.sendMessage(login.numberArray[0], textMessages.intro);
		},
		() => {
			/* This function is executed when the job stops */
		},
		true /* Start the job right now */,
		'America/Chicago'
	);

	return;
};

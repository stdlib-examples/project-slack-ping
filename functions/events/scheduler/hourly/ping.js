const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* @returns {object} workflow The result of your workflow steps
*/
module.exports = async () => {

	// Prepare workflow object to store API responses

  let workflow = {};

  // [Workflow Step 1]

	console.log(`Running slack.channels[@0.4.23].messages.create()...`);

	workflow.ping = await lib.slack.channels['@0.4.23'].messages.create({
		channel: '#random',
		text: 'Ping!'
	});

	return workflow;
};

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* @param {object} event
* @returns {object} workflow
*/
module.exports = async (event) => {

	// Prepare workflow object to store API responses

  let workflow = {};

  // [Workflow Step 1]

  console.log(`Running slack.users[@0.3.19].retrieve()...`);

  workflow.user = await lib.slack.users['@0.3.19'].retrieve({
    user: `${event.user_id}`
  });

  // [Workflow Step 2]

  console.log(`Running slack.conversations[@0.0.10].info()...`);

  workflow.channel = await lib.slack.conversations['@0.0.10'].info({
    id: `${event.channel_id}`
  });

  // [Workflow Step 3]

	console.log(`Running slack.channels[@0.4.23].messages.create()...`);

	workflow.response = await lib.slack.channels['@0.4.23'].messages.create({
		channel: `#${workflow.channel.name}`,
		text: `<@${workflow.user.name}> echo: ${event.text}`
	});

	return workflow;
};

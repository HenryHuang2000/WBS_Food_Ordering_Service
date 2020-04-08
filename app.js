(function () {
    'use strict';

    const add_restaurant_ui = {
    	"type": "modal",
    	"title": {
    		"type": "plain_text",
    		"text": "Add Restaurant",
    		"emoji": true
    	},
    	"submit": {
    		"type": "plain_text",
    		"text": "Submit",
    		"emoji": true
    	},
    	"close": {
    		"type": "plain_text",
    		"text": "Cancel",
    		"emoji": true
    	},
    	"blocks": [
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Restaurant Name",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"label": {
    				"type": "plain_text",
    				"text": "Restaurant Description / Notes",
    				"emoji": true
    			},
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true
    			},
    			"optional": true
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input",
    				"multiline": true
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Menu Items (comma separated)",
    				"emoji": true
    			}
    		},
    		{
    			"type": "input",
    			"element": {
    				"type": "plain_text_input"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Menu Image (URL)",
    				"emoji": true
    			}
    		}
    	]
    };

    const { App } = require('@slack/bolt');

    // Initializes your app with your bot token and signing secret
    const app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET
    });

    (async () => {
      // Start your app
      await app.start(process.env.PORT || 3000);

      console.log('⚡️ Bolt app is running!');
    })();

    // Add a new restaurant
    app.command('/add_restaurant', async ({ ack, body, context }) => {
        await ack();
        await app.client.views.open({
            token: context.botToken,
            trigger_id: body.trigger_id,
            view: add_restaurant_ui
        });
    });

}());

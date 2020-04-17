(function () {
    'use strict';

    const add_restaurant_ui = {
        "type": "modal",
        "callback_id": "add_rest_view",
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
                "block_id": "rest_name",
    			"element": {
                    "type": "plain_text_input",
                    "action_id": "rest_name_input"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Restaurant Name",
    				"emoji": true
    			}
    		},
    		{
                "type": "input",
                "block_id": "rest_desc",
    			"label": {
    				"type": "plain_text",
    				"text": "Restaurant Description / Notes",
    				"emoji": true
    			},
    			"element": {
                    "type": "plain_text_input",
                    "action_id": "rest_desc_input",
    				"multiline": true
    			},
    			"optional": true
    		},
    		{
                "type": "input",
                "block_id": "rest_menu",
    			"element": {
                    "type": "plain_text_input",
                    "action_id": "rest_menu_input",
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
                "block_id": "rest_img",
    			"element": {
                    "type": "plain_text_input",
                    "action_id": "rest_img_input"
    			},
    			"label": {
    				"type": "plain_text",
    				"text": "Menu Image (URL)",
    				"emoji": true
    			}
    		}
    	]
    };

    function choose_restaurant_ui(restaurants) {
        
        let options = [];
        for (let i = 0; i < restaurants.length; i++) {
            options.push({
                "text": {
                    "type": "plain_text",
                    "text": `${restaurants[i]['name']}`,
                    "emoji": true
                },
                "value": `${restaurants[i]['name']}`
            });
        }
        
        return {
            "type": "modal",
            "callback_id": "choose_restaurant_view",
            "title": {
                "type": "plain_text",
                "text": "Select a restaurant",
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
                    "type": "divider"
                },
                {
                    "type": "section",
                    "block_id": 'restaurant_selection',
                    "text": {
                        "type": "mrkdwn",
                        "text": "Please select a restaurant:"
                    },
                    "accessory": {
                        "type": "static_select",
                        "action_id": "selected_restaurant",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select an item",
                            "emoji": true
                        },
                        "options": options
                    }
                }
            ]
        };
    }

    const { App } = require('@slack/bolt');
    const PouchDB = require('pouchdb');

    const db = init_db();
    const app = init_app();

    function init_db() {
        const db = new PouchDB('my_database');
        (async () => {
            // Create a list of restaurants.
            try {
                await db.put({
                    _id: 'restaurants_id',
                    title: 'restaurants',
                    'restaurants': []
                });
            } catch (err) {
                console.log(err);
            }
        })();

        return db;
    }
    function init_app() {
        // Initializes your app with your bot token and signing secret
        const app = new App({
            token: process.env.SLACK_BOT_TOKEN,
            signingSecret: process.env.SLACK_SIGNING_SECRET
        });
        (async () => {
            await app.start(process.env.PORT || 3000);
            console.log('⚡️ Bolt app is running!');
        })();

        return app;
    }

    function init_slash_commands() {
        // Add a new restaurant
        app.command('/add_restaurant', async ({ ack, body, context }) => {
            await ack();
            try {
                await app.client.views.open({
                    token: context.botToken,
                    trigger_id: body.trigger_id,
                    view: add_restaurant_ui
                });
            }
            catch(error) {
                console.error(error);
            }
        });

        // Handle the view submission of new restaurant.
        app.view('add_rest_view', async ({ ack, body, view, context }) => {
            await ack();

            // Convert the menu into a list.
            const menu = view['state']['values']['rest_menu']['rest_menu_input']['value'].split(', ');
            let restaurant = {
                name: view['state']['values']['rest_name']['rest_name_input']['value'],
                desc: view['state']['values']['rest_desc']['rest_desc_input']['value'],
                menu: menu,
                img:  view['state']['values']['rest_img']['rest_img_input']['value']
            };

            // Message placeholder.
            let msg = '';
            // Add the restaurant to the database.
            try {
                let doc = await db.get('restaurants_id');
                doc['restaurants'].push(restaurant);

                let response = await db.put({
                    _id: 'restaurants_id',
                    _rev: doc._rev,
                    title: "restaurants",
                    'restaurants': doc['restaurants']
                });
                if (response['ok']) {
                    msg = 'Your submission was successful';
                } else {
                    msg = 'There was an error with your submission';
                }

            } catch (err) {
                console.log(err);
            }

            // Message the user
            const user = body['user']['id'];
            try {
                await app.client.chat.postMessage({
                    token: context.botToken,
                    channel: user,
                    text: msg
                });
            }
            catch (error) {
                console.error(error);
            }

        });

        // Lists saved restaurants.
        app.command('/list_restaurants', async ({ ack, say }) => {
            await ack();
            const doc = await db.get('restaurants_id');
            const restaurants = doc['restaurants'];
        
            if (restaurants.length == 0) {
                await say('There are currently no saved restaurants.');
            } else {
                await say('The saved restaurants are:\n');
                for (let i = 0; i < restaurants.length; i++) {
                    await say(`${restaurants[i]['name']}`);
                }
            }
        });

        // Choose a restaurant to display.
        app.command('/choose_restaurant', async ({ ack, say, body, context }) => {
            await ack();
            try {
                // Get the list of restaurants.
                const doc = await db.get('restaurants_id');
                const restaurants = doc['restaurants'];

                if (restaurants.length == 0) {
                    await say('There are currently no saved restaurants.');
                } else {
                    await app.client.views.open({
                        token: context.botToken,
                        trigger_id: body.trigger_id,
                        view: choose_restaurant_ui(restaurants)
                    });
                }
            }
            catch(error) {
                console.error(error);
            }
        });

        // Handle the view submission of new restaurant.
        app.view('choose_restaurant_view', async ({ ack, body, view, context }) => {
            await ack();

            // Get the restaurant name.
            let rest_name = undefined;
            try {
                const block = view['state']['values']['restaurant_selection'];
                rest_name = block['selected_restaurant']['value'];
            } catch (err) {
                console.log(err);
            }
            
            let msg = '';
            try {
                // Find the restaurant.
                const doc = await db.get('restaurants_id');
                const restaurant = doc['restaurants'].find(element => {
                    if (element['name'] == rest_name) {
                        return element;
                    }
                });

                // If found, set the order screen.
                const order_screen = new OrderScreen(restaurant);
                try {
                    const response = await db.put({
                        _id: 'restaurants_id',
                        _rev: doc._rev,
                        title: "restaurants",
                        'restaurants': doc['restaurants'],
                        'order_screen': order_screen.render()
                    });
                    if (response['ok']) {
                        msg = 'The order screen was changed.';
                    } else {
                        msg = 'There was an error wtih changing the restaurant.';
                    }
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }

            // Message the user
            const user = body['user']['id'];
            try {
                await app.client.chat.postMessage({
                    token: context.botToken,
                    channel: user,
                    text: msg
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }

    function init_events() {
        
        app.event('app_home_opened', async ({ event, context }) => {
            
            // Shows the menu when the app is opened.
            const doc = await db.get('restaurants_id');
            const order_screen = doc['order_screen'];
            await app.client.views.publish({
                token: context.botToken,
                user_id: event.user,
                view: order_screen
            });
        });
    }

    init_slash_commands();
    //init_cleanup();
    init_events();
    // init_default();

}());

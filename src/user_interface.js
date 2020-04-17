export {OrderScreen, add_restaurant_ui, choose_restaurant_ui}

// Create the options for each day.
function create_options(choices) {
    
    let options = [];
    for (let i = 0; i < choices.length; i++) {
        options.push({
            "text": {
                "type": "plain_text",
                "text": `${choices[i]}`,
                "emoji": true
            },
            "value": `${choices[i]}`
        });
    }
    
    const weekdays = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday'
    }
    let orders = [];
    for (let i = 0; i < 5; i++) {
        orders.push({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${weekdays[i]}:`
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": options
            }
        });
    }
    return orders;
}
class OrderScreen {
    constructor(properties) {
        this.properties = properties;
    }

    render() {
        let order_screen_ui = {
            "type": "home",
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*This week's restaurant*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*${this.properties['name']}*\n ${this.properties['desc']}`
                    },
                    // "accessory": {
                    //     "type": "image",
                    //     "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
                    //     "alt_text": "alt text for image"
                    // }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Menu*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "image",
                    "title": {
                        "type": "plain_text",
                        "text": "Menu",
                        "emoji": true
                    },
                    "image_url": `${this.properties['img']}`,
                    "alt_text": "Menu"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Your orders*"
                    }
                },
                {
                    "type": "divider"
                }
            ]
        };
        const options = create_options(this.properties['menu']);
        order_screen_ui['blocks'] = order_screen_ui['blocks'].concat(options);
        return order_screen_ui;
    }
}

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
}

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
        })
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
};
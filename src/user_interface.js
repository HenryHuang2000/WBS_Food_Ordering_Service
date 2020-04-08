export {order_screen_ui, add_restaurant_ui}

const order_screen_ui = {
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
                "text": "*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
            },
            "accessory": {
                "type": "image",
                "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg",
                "alt_text": "alt text for image"
            }
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
                "text": "Menu 06/04/2020",
                "emoji": true
            },
            "image_url": "https://image.freepik.com/free-vector/restaurant-menu-template-design_23-2148404703.jpg",
            "alt_text": "Menu 06/04/2020"
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
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Monday:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ]
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Tuesday:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ]
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Wednesday:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ]
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Thursday:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ]
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Friday:"
            },
            "accessory": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 1",
                            "emoji": true
                        },
                        "value": "value-0"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 2",
                            "emoji": true
                        },
                        "value": "value-1"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Choice 3",
                            "emoji": true
                        },
                        "value": "value-2"
                    }
                ]
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Total due: $25*"
            }
        }
    ]
};

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
}




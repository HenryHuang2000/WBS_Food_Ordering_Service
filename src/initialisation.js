const { App } = require('@slack/bolt');
const PouchDB = require('pouchdb');

import {OrderScreen} from './user_interface'

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
};

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
};

// Initialise a default order screen.
async function init_default() {
    // Create a sample order screen.
    const restaurant = {
        name: 'Farmhouse Thai Cuisine',
        desc: 'They do have some vegan options, like the roti and curry, plus ' +
        'they have a ton of salad stuff and noodles can be ordered without ' +
        'meat!! They have something for everyone here',
        menu: ['Item 1', 'Item 2', 'Item 3'],
        img: 'https://image.freepik.com/free-vector/restaurant-menu-template-design_23-2148404703.jpg'
    };
    const order_screen = new OrderScreen(restaurant);

    // Add the restaurant to the database.
    try {
        let doc = await db.get('restaurants_id');
        await db.put({
            _id: 'restaurants_id',
            _rev: doc._rev,
            title: "restaurants",
            'restaurants': doc['restaurants'],
            'order_screen': order_screen.render()
        });

    } catch (err) {
        console.log(err);
    }
}

// Resets the database when the server is stopped.
function init_cleanup() {
    process.on('SIGINT', (async () => {
        console.log("Caught interrupt signal. Deleting database.");
        try {
            await db.destroy();
            process.exit();
        } catch (err) {
            console.log(err);
            process.exit();
        }
    }));
};



export {app, db, init_cleanup, init_default}
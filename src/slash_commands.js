import {app, db} from './initialisation'
import {add_restaurant_ui, choose_restaurant_ui} from './user_interface'

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
        }

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
            await say('There are currently no saved restaurants.')
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
                await say('There are currently no saved restaurants.')
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
            const block = view['state']['values']['restaurant_selection']
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
};

export default init_slash_commands;
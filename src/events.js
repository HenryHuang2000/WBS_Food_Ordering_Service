import {app, db} from './initialisation'

function init_events() {
    
    app.event('app_home_opened', async ({ event, context }) => {
        
        // Shows the menu when the app is opened.
        const doc = await db.get('restaurants_id');
        const order_screen = doc['order_screen']
        await app.client.views.publish({
            token: context.botToken,
            user_id: event.user,
            view: order_screen
        });
    });
};

export default init_events;
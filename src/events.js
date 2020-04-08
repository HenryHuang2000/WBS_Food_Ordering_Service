import app from './initialisation'
import {order_screen_ui} from './user_interface'

// Shows the menu when the app is opened.
app.event('app_home_opened', async ({ event, context }) => {
    
    await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: order_screen_ui
    });
});

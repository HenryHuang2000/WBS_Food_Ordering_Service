import client_ui from "./user_interface";
import {admins} from './data';

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

// Shows the menu when the app is opened.
app.event('app_home_opened', async ({ event, context }) => {
    
    await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: client_ui
    });
});

// Shows who the admins are.
app.command('/admins', async ({ command, ack, say }) => {
    await ack();
    console.log(command.token)
    console.log('test')
    await say(`Admins are: ${command.token}`);
});

// console.log(app.client.users.identity('2Bk9ItzVP4OYr3TKaxr73fpY'))
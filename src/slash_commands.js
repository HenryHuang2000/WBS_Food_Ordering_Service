import {app} from './initialisation'
import {add_restaurant_ui} from './user_interface'

// Add a new restaurant
app.command('/add_restaurant', async ({ ack, body, context }) => {
    await ack();
    await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: add_restaurant_ui
    });
});

// Handle the view submission of new restaurant.
/ Handle a view_submission event
app.view('view_b', async ({ ack, body, view, context }) => {
  // Acknowledge the view_submission event
  await ack();

  // Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

  // Assume there's an input block with `block_1` as the block_id and `input_a`
  const val = view['state']['values']['block_1']['input_a'];
  const user = body['user']['id'];

  // Message to send user
  let msg = '';
  // Save to DB
  const results = await db.set(user.input, val);

  if (results) {
    // DB save was successful
    msg = 'Your submission was successful';
  } else {
    msg = 'There was an error with your submission';
  }

  // Message the user
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
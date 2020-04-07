import app from main.js

app.post('/menu', function(req, res) {
    res.send('Your ngrok tunnel is up and running!');
});
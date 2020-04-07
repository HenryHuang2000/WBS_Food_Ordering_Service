(function (exports) {
    'use strict';

    var express = require('express');

    // Instantiates Express and assigns our app variable to it.
    var app = express();
    const PORT=4390;

    // Starts server.
    app.listen(PORT, function () {
        //Callback triggered when server is successfully listening. Hurray!
        console.log("Food Ordering app listening on port " + PORT);
    });

    exports.app = app;

    return exports;

}({}));

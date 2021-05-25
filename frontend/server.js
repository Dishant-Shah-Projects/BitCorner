//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const path = require('path');
// let gmail = require('./app/routes/gmail');





// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build','/index.html'));
});
//Setting up server
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


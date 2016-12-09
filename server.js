var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var database = require('./database')(mongoose);
var passport = require('./passport')(app, database);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
require("./assignment/app")(app, database, passport);
require("./project/app")(app, database, passport);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.PORT || 3000;

require("./sandbox/http/proxy")(app);


app.use('/uploads', express.static(__dirname + "./uploads"));

var router = express.Router();

app.listen(port, ipaddress);

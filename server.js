var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);



/*var websites = [
    { _id: "123", name: "Facebook",    uid: "456", description: "most popular social networking website"},
    { _id: "234", name: "Twitter",     uid: "456", description: "the favourite blog site for celebs"},
    { _id: "456", name: "Gizmodo",     uid: "456", description: "all things technical"},
    { _id: "567", name: "Tic Tac Toe", uid: "123", description: "the classic old x's and o's"},
    { _id: "678", name: "Checkers",    uid: "123", description: "mind game"},
    { _id: "789", name: "Chess",       uid: "234", description: "mind game"}
];*/

/*app.get("/website", function(req, res){
    res.send(websites);
});*/

require("./assignment/app")(app);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

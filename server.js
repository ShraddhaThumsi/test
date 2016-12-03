var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/assignment');
var multer  = require('multer');
//var postSchema = mongoose.Schema({});
// Add headers
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


/*require ("./test/app.js")(app);*/
//require("./image upload practice/app.js")(app);
//require("./assignment/todo/todo.service.server.js")(app);


//require("./assignment/app")(app);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
require("./project/app")(app);
/*require("../web-dev-template/project/app")(app);*/

app.use('/uploads', express.static(__dirname + "./uploads"));
var multer = require('multer');
var upload = multer({ dest: './uploads' });

//to upload file to mongodb
var router = express.Router();

app.listen(port, ipaddress);
/*

var courseSchema = new mongoose.Schema({
    title: String,
    seats: {type: Number, default: 25},
    starts: {type: Date, default: Date.now}
}, {collection: "course"});

app.get("/rest/course", function(req, res){
    res.send("Hello world");

})

var course = mongoose.model("Course", courseSchema);
course.create({title: "ASP.NET", seats: 34}, function(err, results){
    console.log(err);
    console.log(results);
});

course.create({title: "JAVA", seats: 45}, function(err, results){
    console.log(err);
    console.log("above is the error in inserting row, if any");
    console.log(results);
    console.log("above is the resultant record after inserting into database");
})
*/


//------------------------------------------------------------------------
//File upload code



/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        lastName: String
    }, {collection: "user"});

    return UserSchema;
};
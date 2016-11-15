/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        first: String,
        last: String
    }, {collection: "user"});

    return UserSchema;
};
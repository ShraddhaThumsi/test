/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        _id: String,
        email: String,
        password: String,
        firstName: String,
        lastName: String
    }, {collection: "user"});

    return UserSchema;
}
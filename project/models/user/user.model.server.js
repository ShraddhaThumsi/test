/**
 * Created by shraddha on 11/18/16.
 */

module.exports = function(){
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser
    }
    return api;

    function createUser(user)
    {
        return UserModel.createUser(user);
    }
}
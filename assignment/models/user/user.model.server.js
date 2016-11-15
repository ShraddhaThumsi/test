/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser
    }
    return api;
    function createUser(user)
    {
        return UserModel.create(user);
    }

    function findUserById(userId)
    {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user)
    {
        return UserModel.update(
            {
                _id: userId
            },
            {
               first: user.first,
                last: user.last
            })
    }
};
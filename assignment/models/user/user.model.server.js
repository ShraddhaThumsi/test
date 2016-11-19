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
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUserName: findUserByUserName
    }
    return api;
    function createUser(user)
    {
        return UserModel.create(user);
    }

    function findUserById(userId)
    {
        var user = UserModel.findById(userId);

        return user;
    }

    function updateUser(userId, user)
    {
        return UserModel.update(
            {
                _id: userId
            },
            {
               firstName: user.firstName,
                lastName: user.lastName
            })
    }

    function deleteUser(userId)
    {
        return UserModel.remove({_id: userId});
    }

    function findUserByCredentials(username, password)
    {
        return UserModel.find({
            username: username,
            password: password
        })
    }

    function findUserByUserName(username)
    {
        return UserModel.find({username: username})
    }
};
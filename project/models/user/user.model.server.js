/**
 * Created by shraddha on 11/18/16.
 */

module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId,
        viewGroup: viewGroup
    }
    return api;

    function setModel(_model)
    {
        model = _model;
    }

    function createUser(user)
    {
        return UserModel.create(user);
    }

    function findUserByFacebookId(facebookId)
    {
        return UserModel
            .findOne({"facebook.id" : facebookId});
    }
    function findUserByCredentials(email, password)
    {

        return UserModel.findOne({
            email: email,
            password: password
        })
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

    function viewGroup(userId)
    {

        var group = [];
        console.log(group);
        return UserModel.findById(userId);
    }

}
/**
 * Created by shraddha on 11/18/16.
 */
var q = require("q");
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
        viewInbox: viewInbox,
        getAllUsers: getAllUsers,
        sendEmail: sendEmail,
        findAllRecipesForUser: findAllRecipesForUser
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
        var deferred = q.defer();
        UserModel
            .update({_id: userId},
                { $set : user},
            function(error, status) {
                if(!error)
                {
                    deferred.resolve(status);
                }
                else
                {
                    deferred.reject(error);
                }
            });
        return deferred.promise;
        /*console.log("in model",userId);
        var prom = UserModel.update(
            {
                _id: userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName
            });
        console.log(prom);

        return prom;*/
    }

    function deleteUser(userId)
    {
        return UserModel.remove({_id: userId});
    }

    function viewInbox(userId)
    {

        var group = [];
        console.log(group);
        return UserModel.findById(userId);
    }

    function getAllUsers()
    {
        return UserModel.find();
    }

    function sendEmail(userId, message)
    {
        console.log(__dirname);
        return UserModel.update({
            _id: userId
        },
            {
                inbox: [{firstName: "Most Popular", message: message}]
            })
    }

    function findAllRecipesForUser(userId)
    {
        return UserModel
            .findById(userId)
            .populate("recipes")
            .exec();

    }

}
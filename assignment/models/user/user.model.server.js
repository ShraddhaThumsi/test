/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(mongoose){
    var model = {};
   // var mongoose = require("mongoose");
   //  console.log(mongoose);
    var UserSchema = require("./user.schema.server")(mongoose);
    var UserModel = mongoose.model("UserModelAssignment", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredentials:findUserByCredentials,
        findUserByUserName: findUserByUserName,
        findAllWebsitesForUser: findAllWebsitesForUser,
        setModel: setModel,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId
    }
    return api;
    function setModel(_model)
    {
        model = _model;
    }

    function findUserByGoogleId(googleId)
    {
        return UserModel
            .findOne({"google.id" : googleId});
    }
    function findAllWebsitesForUser(userId){

        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();

    }
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
        var prom = UserModel.update(
            {
                _id: userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName
            })
        console.log(prom);
        /*return UserModel.update(
            {
                _id: userId
            },
            {
               firstName: user.firstName,
                lastName: user.lastName
            })*/
    }

    function deleteUser(userId)
    {
        return UserModel.remove({_id: userId});
    }

    function findUserByCredentials(username, password)
    {
        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function findUserByUserName(username)
    {
        return UserModel.findOne({username: username})
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

};
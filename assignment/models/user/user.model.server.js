/**
 * Created by shraddha on 11/14/16.
 */
var q = require("q");
module.exports = function(mongoose){
    var model = {};
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
    };
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
/**
 * Created by shraddha on 11/18/16.
 */
var q = require("q");
module.exports = function(mongoose){
    var model = {};
    var UserSchema = require("./user.schema.server")(mongoose);
    var UserModel = mongoose.model("UserModelProject", UserSchema);
    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByEmail: findUserByEmail,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel,
        findUserByFacebookId: findUserByFacebookId,
        viewInbox: viewInbox,
        getAllUsers: getAllUsers,
        sendEmail: sendEmail,
        findAllRecipesForUser: findAllRecipesForUser,
        promoteMemberByAdmin: promoteMemberByAdmin,
        deleteMemberByAdmin: deleteMemberByAdmin,
        createMemberByAdmin: createMemberByAdmin
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

    function findUserByEmail(email){
        return UserModel.findOne({email: email});
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
        console.log(__filename);
        console.log(message);
        var deferred = q.defer();
        var user;
        UserModel.findById(userId,function(err, doc){
            if(doc){
                doc.inbox.push({"firstName": "Sample mail sender", "message" : message});
                console.log(doc);
                UserModel.update({
                        _id: userId
                    },

                    {$set: doc},
                    function(err, stats){
                        if(!err){
                            deferred.resolve(stats);
                        }else {
                            deferred.reject(err);
                        }
                    })

            }
        });
        console.log(user);

        return deferred.promise;
    }

    function findAllRecipesForUser(userId)
    {
        return UserModel
            .findById(userId)
            .populate("recipes")
            .exec();

    }

    function promoteMemberByAdmin(memberId, member)
    {
        var deferred = q.defer();
        UserModel
            .update({_id: memberId},
                { $set : member},
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

    function deleteMemberByAdmin(memberId)
    {
        return UserModel.remove({_id: memberId});
    }

    function createMemberByAdmin(newUser)
    {
        return UserModel.create(newUser);
    }

}
/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(mongoose){


    var UserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        email: String,
        firstName: String,
        lastName: String,
        google: {
            id: String,
            email: String,
            token: String
        },
        facebook:{
            id: String,
            email: String,
            token: String
        },
        dateCreated: {type: Date, default: Date.now()},
        type: {type: String, default: "assignment"},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}]

    }, {collection: "user"});

    return UserSchema;
};
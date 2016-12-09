/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){

    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
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
       // dateCreated: {type: new Date(), default: Date.now()},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}]
       // websites: [WebsiteSchema]
    }, {collection: "user"});

    return UserSchema;
};
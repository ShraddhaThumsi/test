/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        email: String,
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id: String,
            email: String,
            token: String,
            name: String
        },
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel"}],
        role: {type: String, enum: ['member', 'admin'], default: 'member'},
        group: []
    }, {collection: "userProject"});

    return UserSchema;
}
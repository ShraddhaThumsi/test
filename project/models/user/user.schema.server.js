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
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel"}]
    }, {collection: "userProject"});

    return UserSchema;
}
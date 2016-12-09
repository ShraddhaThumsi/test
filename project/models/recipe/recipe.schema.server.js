/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(mongoose){
   // var mongoose = require("mongoose");
    var RecipeSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        chefNotes: String,
        recipe: JSON

    }, {collection: "recipeProject"});

    return RecipeSchema;
}
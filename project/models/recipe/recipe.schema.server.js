/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var RecipeSchema = mongoose.Schema({
        chefNotes: String,
        recipe: JSON

    }, {collection: "recipeProject"});

    return RecipeSchema;
}
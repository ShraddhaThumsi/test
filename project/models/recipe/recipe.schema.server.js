/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var RecipeSchema = mongoose.Schema({
        recipeName: String,
        recipeDescription: String,
        recipeJSON: JSON

    }, {collection: "recipeProject"});

    return RecipeSchema;
}
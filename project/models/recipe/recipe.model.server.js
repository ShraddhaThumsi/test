/**
 * Created by shraddha on 11/18/16.
 */

module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var RecipeSchema = require("./recipe.schema.server")();
    var RecipeModel = mongoose.model("RecipeModel", RecipeSchema);
    var api = {
        createRecipeForUser: createRecipeForUser,
        setModel: setModel
    }
    return api;

    function setModel(_model){
        model = _model;
    }

    function createRecipeForUser(recipe)
    {
        return model.recipeModel.create(recipe);
    }
}

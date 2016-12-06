/**
 * Created by shraddha on 11/18/16.
 */

module.exports = function(){
    var model = {};
    var mongoose = require('mongoose');
    var RecipeSchema = require("./recipe.schema.server")();
    var RecipeModel = mongoose.model("RecipeModel", RecipeSchema);
    var api = {
        bookMarkRecipe: bookMarkRecipe,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function bookMarkRecipe(userId, recipe)
    {
        console.log(recipe);
        return RecipeModel
            .create(recipe)
            .then(function(recipeObj){
                model
                    .userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        userObj.recipes.push(recipeObj);
                        userObj.save();
                        return userObj;
                    })

            })
    }
}

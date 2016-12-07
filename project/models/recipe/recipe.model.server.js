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
        findAllRecipesForUser: findAllRecipesForUser,
        findBookMarkedRecipeById: findBookMarkedRecipeById,
        updateBookMarkedRecipeById: updateBookMarkedRecipeById,
        deleteBookMarkedRecipeById: deleteBookMarkedRecipeById,
        setModel: setModel
    };
    return api;

    function setModel(_model){
        model = _model;
    }

    function bookMarkRecipe(userId, recipe)
    {
        return RecipeModel
            .create(recipe)
            .then(function(RecipeObj){
                model
                    .userModel
                    .findUserById(userId)
                    .then(function(UserObj){
                        UserObj.recipes.push(RecipeObj);
                        RecipeObj._user = UserObj._id;
                        RecipeObj.save();
                        return UserObj.save()
                    })
            })
    }

    function findAllRecipesForUser(userId)
    {
        //console.log(model.userModel.findAllRecipesForUser(userId));
        return model.userModel.findAllRecipesForUser(userId);

    }

    function findBookMarkedRecipeById(recipeId)
    {

    }

    function updateBookMarkedRecipeById(recipeId)
    {

    }

    function deleteBookMarkedRecipeById(recipeId)
    {

    }


}

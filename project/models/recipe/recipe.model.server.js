/**
 * Created by shraddha on 11/18/16.
 */

module.exports = function(mongoose){
    var model = {};
    var RecipeSchema = require("./recipe.schema.server")(mongoose);
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
        console.log(__filename);
        console.log(userId + " userId from recipe server service");
        console.log(recipe + " recipe body from recipe server service");
        return RecipeModel
            .create(recipe)
            .then(function(RecipeObj){
                model
                    .userModel
                    .findUserById(userId)
                    .then(function(UserObj){
                        UserObj.recipes.push(RecipeObj);
                      //  RecipeObj._user = UserObj._id;
                       // RecipeObj.save();
                        //return UserObj.save()
                         UserObj.save();
                        return UserObj;
                    })
            })
    }

    function findAllRecipesForUser(userId)
    {
        return model.userModel.findAllRecipesForUser(userId);

    }

    function findBookMarkedRecipeById(recipeId)
    {
        return RecipeModel.findById(recipeId)
    }

    function updateBookMarkedRecipeById(recipeId, recipe)
    {
        return RecipeModel.update({
            _id: recipeId
        }, {
            chefNotes: recipe.chefNotes
        })
    }

    function deleteBookMarkedRecipeById(recipeId)
    {
        return RecipeModel.remove({_id : recipeId})
    }


}

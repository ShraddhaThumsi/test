/**
 * Created by shraddha on 11/18/16.
 */
var exports = module.exports = {};
module.exports = function (app, model) {

    app.post("/api/recipe", bookMarkRecipe);

    function bookMarkRecipe(req, res)
    {
        var recipe = req.body;
        model
            .recipeModel





    }

}
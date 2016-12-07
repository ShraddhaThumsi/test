/**
 * Created by shraddha on 11/18/16.
 */
var exports = module.exports = {};
module.exports = function (app, model) {

    app.post("/api/user/:uid/bookMarkRecipe", bookMarkRecipe);
    app.get("/api/user/:uid/myRecipes", findAllRecipesForUser);

    function bookMarkRecipe(req, res)
    {
        var userId = req.params.uid;
        var recipe = req.body;
        model
            .recipeModel
            .bookMarkRecipe(userId, recipe)
            .then(function(recipe){
                console.log(recipe);
                res.json(recipe);
            })
    }

    function findAllRecipesForUser(req, res)
    {
        var userId =  req.params.uid;
        model
            .recipeModel
            .findAllRecipesForUser(userId)
            .then(function(recipes){
                res.json(recipes)
            },
            function(error){
                res.sendStatus(400).send(error);
            });


        /*var emptyArray = [];
        res.send({array: emptyArray});*/
    }
}
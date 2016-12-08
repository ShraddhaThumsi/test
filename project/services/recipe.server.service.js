
var exports = module.exports = {};
module.exports = function (app, model) {

    app.post("/api/user/:uid/bookMarkRecipe", bookMarkRecipe);
    app.get("/api/user/:uid/myRecipes", findAllRecipesForUser);
    app.get("/api/user/:uid/bookMarkedRecipe/:rid", findBookMarkedRecipeById);
    app.get("/api/recipeSearchByQuery", getRecipeByQueryName);
    app.get("/api/recipeSearchById", getRecipeByQueryId);

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
    }

    function findBookMarkedRecipeById(req, res)
    {
        var userId = req.params.uid;
        var recipeId = req.params.rid;
        model
            .recipeModel
            .findBookMarkedRecipeById(recipeId)
            .then(function(recipe){
                res.json(recipe)
            }, function(error){
                res.sendStatus(400).send(error);
            })
    }

    function getRecipeByQueryName(req, res)
    {
        var queryBody = req.body;
        res.json(queryBody.queryByName)
    }

    function getRecipeByQueryId(req, res)
    {
        var queryBody = req.body;
        res.json(queryBody.queryById);
    }
}
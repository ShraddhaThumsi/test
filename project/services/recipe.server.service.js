
var exports = module.exports = {};
module.exports = function (app, model) {

    var http = require('http');
    app.post("/api/user/:uid/bookMarkRecipe", bookMarkRecipe);
    app.get("/api/user/:uid/myRecipes", findAllRecipesForUser);
    app.get("/api/user/:uid/bookMarkedRecipe/:rid", findBookMarkedRecipeById);
  //  app.get("/api/recipeSearchByQuery", getRecipeByQueryName);
    app.get("/api/recipeSearchById", getRecipeByQueryId);
    app.put("/api/user/:uid/editRecipe/:rid", editBookmarkedRecipe);
    app.delete("/api/user/:uid/deleteBookMarkedRecipe/:rid", deleteBookMarkedRecipe);
    app.get("/api/user/recipeSearch/:queryName", recipeSearch);
    app.get("/api/user/recipeDetails/:rid", recipeDetails);

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

   /* function getRecipeByQueryName(req, res)
    {
        var queryBody = req.body;
        res.json(queryBody.queryByName)
    }*/

    function getRecipeByQueryId(req, res)
    {
        var queryBody = req.body;
        res.json(queryBody.queryById);
    }

    function editBookmarkedRecipe(req, res)
    {
        var userId = req.params.uid;
        var recipeId = req.params.rid;
        var recipe = req.body;
        var chefNotes = recipe.chefNotes;
        model
            .recipeModel
            .updateBookMarkedRecipeById(recipeId, recipe)
            .then(function(status){
                res.send(status);
            }, function(error){
                res.sendStatus(400).send(error);
            })
    }

    function deleteBookMarkedRecipe(req, res)
    {
        var recipeId = req.params.rid;
        model
            .recipeModel
            .deleteBookMarkedRecipeById(recipeId)
            .then(function(status){
                res.send(status)
            }, function(error){
                res.sendStatus(400).send(error)
            })
    }

    function recipeSearch(req, res)
    {
        var query = req.params.queryName;
        var apiCallString = "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8&q=" + query;
       //console.log(apiCallString);
        callback = function(response)
        {
            var str = "";
            //console.log(response);

            response.on('data', function (chunk) {
                str = str + chunk;
            });

            response.on('end', function () {
               // console.log("String Made " , str);
                res.writeHead(200, {"Content-Type" : "application/json"});
                res.end(str);
            });
        }

        http.request(apiCallString, callback).end();
    }

    function recipeDetails(req, res)
    {
        var recipeId = req.params.rid;
        var urlConstructor = "http://api.edamam.com/search?app_id=be979c85&app_key=a6ded68b7dd66370c211045072bcb1a8" +
            "&r=http://www.edamam.com/ontologies/edamam.owl%23";
        var apiCallString = urlConstructor + recipeId;
       // console.log(apiCallString);
        callback = function(response)
        {
            var str = "";
            //console.log(response);

            response.on('data', function (chunk) {
                str = str + chunk;
            });

            response.on('end', function () {
               // console.log("String Made " , str);
                res.writeHead(200, {"Content-Type" : "application/json"});
                res.end(str);
            });
        }

        http.request(apiCallString, callback).end();
    }
}
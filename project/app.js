module.exports = function(app, database, passport)
{
    var model = database.project();
    require("./services/user.server.service")(app, model, passport);
    require("./services/recipe.server.service")(app, model);
}
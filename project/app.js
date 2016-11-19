module.exports = function(app)
{
    var model = require("./models/model.server")();
    require("./services/user.server.service")(app, model);
  //  require("./services/recipe.server.service")(app, model);
}
/**
 * Created by shraddha on 11/12/16.
 */
module.exports = function(app){

    require("./services/user.service.server.js")(app);
    require("./services/recipe.service.server.js")(app);
}
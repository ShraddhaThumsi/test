/**
 * Created by shraddha on 10/27/16.
 */
module.exports = function(app, database, passport) {

    var model = database.assignment();
    require("./services/user.service.server.js")(app, model, passport);
    require("./services/website.service.server.js")(app, model);
    require("./services/page.service.server.js")(app, model);
    require("./services/widget.service.server.js")(app, model);
};
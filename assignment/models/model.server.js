/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(mongoose){
    /*var mongoose = require('mongoose');
    var connectionString = "mongodb://localhost/assignment";
    if (process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);*/
    // console.log(mongoose);
    var userModel = require("./user/user.model.server")(mongoose);
    var websiteModel = require("./website/website.model.server")(mongoose);
    var pageModel = require("./page/page.model.server")(mongoose);
    var widgetModel = require("./widget/widget.model.server")(mongoose);
    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);
    return model;




};
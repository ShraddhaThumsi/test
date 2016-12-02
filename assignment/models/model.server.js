/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    var connectionString = "mongodb://localhost/assignment";
    if (process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();
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
/**
 * Created by shraddha on 11/14/16.
 */
module.exports = function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');
    var userModel = require("./user/user.model.server")();
    var model = {
        userModel: userModel
    };
    return model;

};
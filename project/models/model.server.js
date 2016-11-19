module.exports = function(){
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');
    var userModel = require("./user/user.model.server")();
  //  var recipeModel = require("./recipe/recipe.model.server")();

    var model = {
        userModel: userModel
       // recipeModel: recipeModel
    };
    return model;




};
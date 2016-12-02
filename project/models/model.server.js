module.exports = function(){
    var mongoose = require('mongoose');
    var connectionString = "mongodb://localhost/project";
    if (process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);
   // mongoose.connect('mongodb://localhost/wam-fall-2016');
    var userModel = require("./user/user.model.server")();
  //  var recipeModel = require("./recipe/recipe.model.server")();

    var model = {
        userModel: userModel
       // recipeModel: recipeModel
    };
    userModel.setModel(model);
    //recipeModel.setModel(model);
    return model;




};
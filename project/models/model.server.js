module.exports = function(mongoose){

    var userModel = require("./user/user.model.server")(mongoose);
    var recipeModel = require("./recipe/recipe.model.server")(mongoose);

    var model = {
        userModel: userModel,
        recipeModel: recipeModel
    };
    userModel.setModel(model);
    recipeModel.setModel(model);
    return model;




};
/**
 * Created by shraddha on 12/3/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("RecipeDetailsController", RecipeDetailsController);

    function RecipeDetailsController()
    {
        var vm = this;
        vm.message = "controller loads correctly";
        console.log("hello from recipe details controller");
    }
})();
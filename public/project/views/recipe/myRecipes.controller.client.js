/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("MyRecipeController", MyRecipeController);

    function MyRecipeController()
    {
        var vm = this;
        vm.clickMe = clickMe;
        function clickMe()
        {
            console.log("Hello from my recipe controller");
        }
    }
})();
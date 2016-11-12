/**
 * Created by shraddha on 11/11/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("UploadRecipeController", UploadRecipeController);

    function UploadRecipeController()
    {
        var vm = this;
        console.log("hello from upload recipe controller");
    }
})();
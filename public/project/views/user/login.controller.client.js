/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $rootScope, RecipeService)
    {
        var vm = this;
        vm.loginUser = loginUser;
        vm.loadDoc = loadDoc;
        vm.infoAlert = infoAlert;
        var basicInformation = "Welcome to Homestraunt! This is an online recipe and nutrient guide that will help you whip up some restaurant standard dishes right at your own home. Try out our recipe search by entering an ingredient, which will give you a choice of recipes whose details you can see when you click on the image. You may have to wait just a couple of seconds till we fish out good recipes for you. By signing up, you can explore more features like bookmarking recipes, adding chef notes, and you can also get in touch with our most popular user. Happy Cooking!"

        vm.basicInformation = basicInformation;
        function loginUser(email, password)
        {
            vm.email = email;
            vm.password = password;

           // console.log(email, password);
           // var promise = UserService.findUserByCredentials(email, password);
            var promise = UserService.login(email, password);
            promise
                .success(function(user){
                    /*console.log(aaa);*/
                    if(user)
                    {
                        console.log(user);
                        vm.user = user;
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    }

                    else
                    {
                        vm.error = "No such user";
                    }

                })
                .error(function(bbb){
                    console.log(bbb);
                })
        }




        function loadDoc(queryName) {
            console.log("You have asked for recipes on: " +  queryName);
            vm.queryName = queryName;
            var recipe = null;


            var promise = RecipeService.getRecipeByQueryName(queryName);
            promise
                .success(function (result) {
                    console.log(result);
                    var recipes = result.hits;
                    vm.recipes = recipes;
                    var uriTempo = recipes[0].recipe.uri;
                    console.log(uriTempo);
                    var uri = uriTempo.split("#");
                    var rid = uri[1];
                    vm.rid = rid;
                    console.log(uri);
                    console.log(rid);

                })
                .error(function(error)
                {
                    console.log(error);
                });

        }

        function infoAlert()
        {
            alert(basicInformation);

        }

    }
})();
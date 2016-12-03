/**
 * Created by shraddha on 11/20/16.
 */
(function(){
    angular
        .module("RecipeMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location)
    {
        var vm = this;
        vm.loginUser = loginUser;
        function loginUser(email, password)
        {
            vm.email = email;
            vm.password = password;
            console.log(email, password);
           // var promise = UserService.findUserByCredentials(email, password);
            var promise = UserService.login(email, password);
            promise
                .success(function(user){
                    /*console.log(aaa);*/
                    if(user)
                    {
                        vm.user = user;
                        $location.url("/user/" + user._id);
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

    }
})();
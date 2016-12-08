/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        function login(username , password)
        {
            vm.username = username;
            vm.password = password;
           // var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(username, password);
            promise
                .success(function(response){
                    /*console.log(aaa);*/
                    var user = response.data;
                    if(user)
                    {

                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                        vm.success = "Your Profile was successfully saved!";
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
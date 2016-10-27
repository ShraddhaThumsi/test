/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(username , password)
        {
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function(user){
                    /*console.log(aaa);*/
                    if(user === '0')
                    {
                        vm.error = "No such user";
                    }
                    else
                    {
                        $location.url("/user/" + user._id);
                        vm.success = "Your Profile was successfully saved!";
                    }

                })
                .error(function(bbb){
                    console.log(bbb);
                })
            /*if(user === null)
                {
                    vm.error = "No such user";
                }
            else
                {
                    $location.url("/user/" + user._id);
                    vm.success = "Your Profile was successfully saved!";
                }

            var userByName = UserService.findUserByUsername(username);*/
        }

    }
})();
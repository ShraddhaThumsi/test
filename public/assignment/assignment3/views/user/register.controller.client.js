/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService)
    {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser() {
            var potentialUser = {
                username: vm.username,
                password1: vm.password1,
                password2: vm.password2,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };

            if (potentialUser.password1 === potentialUser.password2) {
                var newUser = {
                    username: vm.username,
                    password: vm.password1,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email
                };

                var userExists = UserService.createUser(newUser);


                /*if(!(userExists === true))
                 {

                 vm.newEntry = UserService.createUser(newUser);
                 $location.url("/user/" + vm.newEntry._id);
                 console.log(vm.newEntry);
                 }*/

                if (userExists == true) {
                    alert("User exists");
                }

                else {var userId = userExists._id;
                    vm.userId = userId;
                    vm.registerUser = userExists;
                $location.url("/user/" + vm.userId);
                }
            }

            else vm.error = "Passwords Do not match, please try again";

        }

    }
})();